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
    amount: toNumber(payment.amount),
    reference_id: payment.referenceId,
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

module.exports = {
  mapUser,
  mapCategory,
  mapMenuItem,
  mapOrder,
  mapOrderItem,
  mapPayment,
  mapExpense,
};
