const CONFIGURABLE_FEATURES = [
  'reports',
  'orderHistory',
  'menuManagement',
  'categoryManagement',
  'expenseManagement',
  'attendanceManagement',
  'purchaseManagement',
  'shiftManagement',
  'userManagement',
  'backupManagement',
];

function normalizeUserFeatureAccessOverrides(userFeatureAccessOverrides = {}) {
  return Object.fromEntries(
    CONFIGURABLE_FEATURES
      .filter((featureKey) => typeof userFeatureAccessOverrides?.[featureKey] === 'boolean')
      .map((featureKey) => [featureKey, Boolean(userFeatureAccessOverrides[featureKey])])
  );
}

function getEffectiveFeatureAccess(role, userFeatureAccessOverrides = {}) {
  if (role === 'Admin') {
    return Object.fromEntries(CONFIGURABLE_FEATURES.map((featureKey) => [featureKey, true]));
  }

  const overrides = normalizeUserFeatureAccessOverrides(userFeatureAccessOverrides);

  return Object.fromEntries(
    CONFIGURABLE_FEATURES.map((featureKey) => [
      featureKey,
      Boolean(overrides[featureKey]),
    ])
  );
}

function hasFeatureAccess(role, featureKey, userFeatureAccessOverrides = {}) {
  const effectiveAccess = getEffectiveFeatureAccess(role, userFeatureAccessOverrides);
  return Boolean(effectiveAccess[featureKey]);
}

function hasAnyFeatureAccess(role, userFeatureAccessOverrides = {}) {
  return CONFIGURABLE_FEATURES.some((featureKey) =>
    hasFeatureAccess(role, featureKey, userFeatureAccessOverrides)
  );
}

module.exports = {
  CONFIGURABLE_FEATURES,
  getEffectiveFeatureAccess,
  normalizeUserFeatureAccessOverrides,
  hasFeatureAccess,
  hasAnyFeatureAccess,
};
