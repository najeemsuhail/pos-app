export const CONFIGURABLE_ADMIN_FEATURES = [
  { key: 'reports', label: 'Reports', description: 'View sales and analytics reports.' },
  { key: 'orderHistory', label: 'Order History', description: 'Browse past orders and open full bill details.' },
  { key: 'menuManagement', label: 'Menu Items', description: 'Create, edit, and delete menu items.' },
  { key: 'categoryManagement', label: 'Categories', description: 'Create, rename, and delete menu categories.' },
  { key: 'expenseManagement', label: 'Operating Expenses', description: 'Manage operating expense entries and expense history.' },
  { key: 'attendanceManagement', label: 'Staff Attendance', description: 'Mark daily attendance and review attendance history for staff.' },
  { key: 'purchaseManagement', label: 'Purchases', description: 'Manage suppliers, purchases, and supplier dues.' },
  { key: 'shiftManagement', label: 'Shifts', description: 'Open shifts, close shifts, and review cash differences.' },
  { key: 'userManagement', label: 'Users', description: 'Create users, delete users, and reset passwords.' },
  { key: 'backupManagement', label: 'Backup', description: 'Create, restore, upload, and download backups.' },
];

export const normalizeUserFeatureAccessOverrides = (featureAccessOverrides = {}) =>
  Object.fromEntries(
    CONFIGURABLE_ADMIN_FEATURES
      .map(({ key }) => key)
      .filter((featureKey) => typeof featureAccessOverrides?.[featureKey] === 'boolean')
      .map((featureKey) => [featureKey, Boolean(featureAccessOverrides[featureKey])])
  );

export const getEffectiveFeatureAccess = (role, userFeatureAccessOverrides = {}) => {
  if (role === 'Admin') {
    return Object.fromEntries(CONFIGURABLE_ADMIN_FEATURES.map(({ key }) => [key, true]));
  }

  const overrides = normalizeUserFeatureAccessOverrides(userFeatureAccessOverrides);

  return Object.fromEntries(
    CONFIGURABLE_ADMIN_FEATURES.map(({ key }) => [key, Boolean(overrides[key])])
  );
};

export const hasFeatureAccess = (role, featureKey, userFeatureAccessOverrides = {}) => {
  const effectiveAccess = getEffectiveFeatureAccess(role, userFeatureAccessOverrides);
  return Boolean(effectiveAccess[featureKey]);
};

export const hasAdminDashboardAccess = (role, userFeatureAccessOverrides = {}) =>
  CONFIGURABLE_ADMIN_FEATURES.some(({ key }) =>
    hasFeatureAccess(role, key, userFeatureAccessOverrides)
  );
