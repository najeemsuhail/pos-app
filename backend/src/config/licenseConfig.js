const DEFAULT_TRIAL_DURATION_DAYS = 7;

function getTrialDurationDays() {
  const rawValue = process.env.LICENSE_TRIAL_DAYS;

  if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') {
    return DEFAULT_TRIAL_DURATION_DAYS;
  }

  const parsed = Number(String(rawValue));

  if (!Number.isInteger(parsed) || parsed < 0) {
    return DEFAULT_TRIAL_DURATION_DAYS;
  }

  return parsed;
}

module.exports = {
  DEFAULT_TRIAL_DURATION_DAYS,
  getTrialDurationDays,
};
