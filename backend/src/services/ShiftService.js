const ShiftRepository = require('../repositories/ShiftRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const { normalizePaymentMethod } = require('../utils/paymentState');

function toMoneyNumber(value) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return null;
  }

  return Math.round(numberValue * 100) / 100;
}

class ShiftService {
  categorizeMethod(method) {
    const normalized = normalizePaymentMethod(method).toLowerCase();

    if (normalized.includes('cash')) {
      return 'cashTotal';
    }

    if (normalized.includes('card')) {
      return 'cardTotal';
    }

    if (normalized.includes('upi') || normalized.includes('gpay') || normalized.includes('phonepe') || normalized.includes('paytm')) {
      return 'upiTotal';
    }

    return 'otherTotal';
  }

  async getOpenShift() {
    return ShiftRepository.findOpen();
  }

  async getShiftHistory(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return ShiftRepository.findByDateRange(start.toISOString(), end.toISOString());
  }

  async openShift(user, { openingCash = 0, openingNotes = '' } = {}) {
    const existingOpenShift = await ShiftRepository.findOpen();

    if (existingOpenShift) {
      throw { status: 409, message: 'A shift is already open' };
    }

    const normalizedOpeningCash = toMoneyNumber(openingCash);
    if (normalizedOpeningCash === null) {
      throw { status: 400, message: 'Opening cash must be a valid amount' };
    }

    return ShiftRepository.create({
      openedByUserId: user.id,
      openingCash: normalizedOpeningCash,
      openingNotes: String(openingNotes || '').trim() || null,
    });
  }

  async calculatePaymentTotals(openedAt, closedAt = new Date()) {
    const payments = await PaymentRepository.findSettledByDateRange(
      new Date(openedAt).toISOString(),
      new Date(closedAt).toISOString()
    );

    return payments.reduce((totals, payment) => {
      const amount = Number(payment.settled_amount) || 0;
      const key = this.categorizeMethod(payment.method);

      totals[key] += amount;
      totals.totalPayments += amount;

      return totals;
    }, {
      cashTotal: 0,
      cardTotal: 0,
      upiTotal: 0,
      otherTotal: 0,
      totalPayments: 0,
    });
  }

  async getClosePreview(id) {
    const shift = await ShiftRepository.findById(id);

    if (!shift) {
      throw { status: 404, message: 'Shift not found' };
    }

    const closedAt = shift.closed_at || new Date();
    const totals = await this.calculatePaymentTotals(shift.opened_at, closedAt);
    const expectedCash = Number(shift.opening_cash || 0) + totals.cashTotal;

    return {
      shift,
      totals,
      expectedCash,
    };
  }

  async closeShift(id, user, { closingCash, closingNotes = '' } = {}) {
    const shift = await ShiftRepository.findById(id);

    if (!shift) {
      throw { status: 404, message: 'Shift not found' };
    }

    if (shift.status !== 'open') {
      throw { status: 409, message: 'Shift is already closed' };
    }

    const normalizedClosingCash = toMoneyNumber(closingCash);
    if (normalizedClosingCash === null) {
      throw { status: 400, message: 'Closing cash must be a valid amount' };
    }

    const closedAt = new Date();
    const totals = await this.calculatePaymentTotals(shift.opened_at, closedAt);
    const expectedCash = Math.round((Number(shift.opening_cash || 0) + totals.cashTotal) * 100) / 100;
    const difference = Math.round((normalizedClosingCash - expectedCash) * 100) / 100;

    return ShiftRepository.close(id, {
      closedByUserId: user.id,
      closingCash: normalizedClosingCash,
      cashTotal: totals.cashTotal,
      cardTotal: totals.cardTotal,
      upiTotal: totals.upiTotal,
      otherTotal: totals.otherTotal,
      totalPayments: totals.totalPayments,
      expectedCash,
      difference,
      closingNotes: String(closingNotes || '').trim() || null,
      closedAt,
    });
  }
}

module.exports = new ShiftService();
