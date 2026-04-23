const SupplierRepository = require('../repositories/SupplierRepository');

class SupplierService {
  async createSupplier(data) {
    const name = data.name?.trim();

    if (!name) {
      throw { status: 400, message: 'Supplier name is required' };
    }

    const existing = await SupplierRepository.findByName(name);
    if (existing) {
      throw { status: 409, message: 'Supplier name already exists' };
    }

    return SupplierRepository.create({
      name,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      notes: data.notes?.trim() || null,
    });
  }

  async getSuppliers() {
    return SupplierRepository.findAll();
  }

  async updateSupplier(id, data) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      throw { status: 400, message: 'Invalid supplier ID' };
    }

    const existing = await SupplierRepository.findRawById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Supplier not found' };
    }

    const nextName = data.name?.trim();
    if (nextName && nextName !== existing.name) {
      const duplicate = await SupplierRepository.findByName(nextName);
      if (duplicate) {
        throw { status: 409, message: 'Supplier name already exists' };
      }
    }

    return SupplierRepository.update(numericId, {
      name: nextName || undefined,
      phone: data.phone !== undefined ? data.phone?.trim() || null : undefined,
      email: data.email !== undefined ? data.email?.trim() || null : undefined,
      address: data.address !== undefined ? data.address?.trim() || null : undefined,
      notes: data.notes !== undefined ? data.notes?.trim() || null : undefined,
    });
  }

  async deleteSupplier(id) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      throw { status: 400, message: 'Invalid supplier ID' };
    }

    const existing = await SupplierRepository.findRawById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Supplier not found' };
    }

    return SupplierRepository.delete(numericId);
  }
}
module.exports = new SupplierService();
