"use client";
import { useEffect, useState } from 'react';
import {Button } from '@mui/material';

const ConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState('Success'); // Randomize for demonstration

  useEffect(() => {
    // Fetch order details from API or local storage
    // Update order status
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 grid gap-6">
         <section aria-labelledby="order-confirmation-heading">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4" id="order-confirmation-heading">
            Order Confirmation
          </h2>
          <p className="text-green-600 font-medium">Thank you for your order!</p>
          <p className="mt-2">
            Your order number is #000000. You will receive an order confirmation email with details of your order and a
            link to track its progress.
          </p>
          <div className="mt-6">
            <Button className="w-full">Continue Shopping</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmationPage;
