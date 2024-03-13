"use client";
import { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState('Success'); // Randomize for demonstration

  useEffect(() => {
    // Fetch order details from API or local storage
    // Update order status
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Order Status</h3>
        <p className={`font-bold ${orderStatus === 'Success' ? 'text-green-500' : orderStatus === 'Failure' ? 'text-red-500' : 'text-yellow-500'}`}>{orderStatus}</p>
      </div>
      {/* Display other order details like items, total, etc. */}
    </div>
  );
};

export default ConfirmationPage;
