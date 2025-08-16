import React from 'react';

export default function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="pagination" role="navigation" aria-label="Transactions pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span className="badge">Page {page} of {pages}</span>
      <button disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</button>
    </div>
  );
}