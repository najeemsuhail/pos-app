const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

const parsePagination = (query = {}) => {
  const page = Math.max(1, parseInt(query.page, 10) || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

const buildPaginationMeta = ({ page, limit, total }) => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

const hasPaginationParams = (query = {}) => query.page !== undefined || query.limit !== undefined;

module.exports = {
  parsePagination,
  buildPaginationMeta,
  hasPaginationParams,
};
