import React from 'react';

const PaginationControls = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { page, totalPages, total, limit } = pagination;
  const start = total === 0 ? 0 : ((page - 1) * limit) + 1;
  const end = Math.min(total, page * limit);

  return (
    <div className="pagination-controls">
      <span>
        Showing {start}-{end} of {total}
      </span>
      <div className="pagination-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="pagination-page">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
