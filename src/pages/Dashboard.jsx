import React from 'react';
import SendMoneyForm from '../components/SendMoneyForm';
import AdsCarousel from '../components/AdsCarousel';
import TransactionHistory from '../components/TransactionHistory';

export default function Dashboard() {
  return (
    <div className="container">
      <div className="row dashboard_first_container">
        <div className="col"><SendMoneyForm /></div>
        <div className="col"><AdsCarousel /></div>
      </div>
      <div style={{ height: 16 }} />
      <TransactionHistory />
    </div>
  );
}
