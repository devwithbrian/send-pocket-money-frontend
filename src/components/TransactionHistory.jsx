import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function TransactionHistory() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const data = await apiGet(`/transactions?page=${p}&pageSize=${pageSize}`);
      setList(data.items);
      setTotal(data.total);
      setPage(data.page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  return (
    <div className="card table_container">
      <h3>Transaction history</h3>
      <button onClick={() => load(page)} disabled={loading}>
        🔄 Refresh
      </button>
      {loading ? (
        <div className="helper">Loading...</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>To</th>
                <th>Send (USD)</th>
                <th>Currency</th>
                <th>Fee</th>
                <th>Rate</th>
                <th>Recipient gets</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((tx) => (
                <tr key={tx._id}>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.recipientName || "-"}</td>
                  <td>{(tx.amountUSD / 100).toFixed(2)}</td>
                  <td>{tx.currency}</td>
                  <td>{(tx.feeUSD / 100).toFixed(2)}</td>
                  <td>{tx.fxRate}</td>
                  <td>
                    {tx.currency === "GBP"
                      ? `£${(tx.amountRecipientMinor / 100).toFixed(2)}`
                      : `R ${(tx.amountRecipientMinor / 100).toFixed(2)}`}
                  </td>
                  <td>
                    <span className="badge">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => load(page - 1)}>
              Prev
            </button>
            <span className="badge">
              Page {page} of {Math.max(1, Math.ceil(total / pageSize))}
            </span>
            <button
              disabled={page >= Math.ceil(total / pageSize)}
              onClick={() => load(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
