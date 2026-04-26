function toNumber(value) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'object' && typeof value.toNumber === 'function') {
    return value.toNumber();
  }

  return Number(value);
}

function mapUser(user) {
  if (!user) {
    return null;
  }

  let featureAccessOverrides = {};
  if (typeof user.featureAccessOverrides === 'string' && user.featureAccessOverrides.trim()) {
    try {
      featureAccessOverrides = JSON.parse(user.featureAccessOverrides);
    } catch (error) {
      featureAccessOverrides = {};
    }
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    password: user.password,
    feature_access_overrides: featureAccessOverrides,
    created_at: user.createdAt,
  };
}

function mapCategory(category) {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    is_deleted: category.isDeleted,
    created_at: category.createdAt,
  };
}

function mapMenuItem(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    price: toNumber(item.price),
    category_id: item.categoryId,
    is_available: item.isAvailable,
    image_url: item.imageUrl,
    is_deleted: item.isDeleted,
    created_at: item.createdAt,
  };
}

function mapOrder(order) {
  if (!order) {
    return null;
  }

  return {
    id: order.id,
    bill_number: order.billNumber,
    status: order.status,
    payment_status: order.paymentStatus,
    customer_name: order.customerName,
    customer_phone: order.customerPhone,
    table_id: order.tableId,
    subtotal: toNumber(order.subtotal),
    discount_amount: toNumber(order.discountAmount),
    tax_amount: toNumber(order.taxAmount),
    final_amount: toNumber(order.finalAmount),
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  };
}

function mapOrderItem(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    order_id: item.orderId,
    menu_item_id: item.menuItemId,
    name: item.name,
    price: toNumber(item.price),
    quantity: item.quantity,
    created_at: item.createdAt,
  };
}

function mapPayment(payment) {
  if (!payment) {
    return null;
  }

  return {
    id: payment.id,
    order_id: payment.orderId,
    method: payment.method,
    source: payment.source,
    status: payment.status,
    amount: toNumber(payment.amount),
    settled_amount: toNumber(payment.settledAmount),
    reference_id: payment.referenceId,
    settled_at: payment.settledAt,
    created_at: payment.createdAt,
  };
}

function mapExpense(expense) {
  if (!expense) {
    return null;
  }

  return {
    id: expense.id,
    expense_date: expense.expenseDate,
    category: expense.category,
    note: expense.note,
    amount: toNumber(expense.amount),
    payment_method: expense.paymentMethod,
    reference: expense.reference,
    created_at: expense.createdAt,
  };
}

function mapAttendance(attendance) {
  if (!attendance) {
    return null;
  }

  return {
    id: attendance.id,
    user_id: attendance.userId,
    attendance_date: attendance.attendanceDate,
    status: attendance.status,
    check_in: attendance.checkIn,
    check_out: attendance.checkOut,
    notes: attendance.notes,
    created_at: attendance.createdAt,
    updated_at: attendance.updatedAt,
    user: attendance.user
      ? {
          id: attendance.user.id,
          name: attendance.user.name,
          role: attendance.user.role,
        }
      : null,
  };
}

function mapSupplier(supplier) {
  if (!supplier) {
    return null;
  }

  const purchases = Array.isArray(supplier.purchases) ? supplier.purchases : [];
  const totalPurchased = purchases.reduce((sum, purchase) => sum + (toNumber(purchase.totalAmount) || 0), 0);
  const totalPaid = purchases.reduce((sum, purchase) => sum + (toNumber(purchase.paidAmount) || 0), 0);

  return {
    id: supplier.id,
    name: supplier.name,
    phone: supplier.phone,
    email: supplier.email,
    address: supplier.address,
    notes: supplier.notes,
    created_at: supplier.createdAt,
    purchase_count: purchases.length,
    total_purchased: totalPurchased,
    total_paid: totalPaid,
    outstanding_amount: Math.max(0, totalPurchased - totalPaid),
  };
}

function mapPurchaseItem(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    purchase_id: item.purchaseId,
    item_name: item.itemName,
    quantity: toNumber(item.quantity),
    unit: item.unit,
    unit_price: toNumber(item.unitPrice),
    total_price: toNumber(item.totalPrice),
    created_at: item.createdAt,
  };
}

function mapPurchase(purchase) {
  if (!purchase) {
    return null;
  }

  const totalAmount = toNumber(purchase.totalAmount) || 0;
  const paidAmount = toNumber(purchase.paidAmount) || 0;

  return {
    id: purchase.id,
    supplier_id: purchase.supplierId,
    purchase_date: purchase.purchaseDate,
    invoice_number: purchase.invoiceNumber,
    payment_status: purchase.paymentStatus,
    subtotal: toNumber(purchase.subtotal),
    tax_amount: toNumber(purchase.taxAmount),
    discount_amount: toNumber(purchase.discountAmount),
    total_amount: totalAmount,
    paid_amount: paidAmount,
    due_amount: Math.max(0, totalAmount - paidAmount),
    note: purchase.note,
    created_at: purchase.createdAt,
    updated_at: purchase.updatedAt,
    supplier: purchase.supplier ? mapSupplier(purchase.supplier) : null,
    items: Array.isArray(purchase.items) ? purchase.items.map(mapPurchaseItem) : [],
  };
}

module.exports = {
  mapUser,
  mapCategory,
  mapMenuItem,
  mapOrder,
  mapOrderItem,
  mapPayment,
  mapExpense,
  mapAttendance,
  mapSupplier,
  mapPurchaseItem,
  mapPurchase,
};
