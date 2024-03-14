"use client";
import { useEffect, useState } from 'react';
import {Button } from '@mui/material';

const ConfirmationPage = () => {
 
  const orderDetails = {
    orderNumber: "#000000",
    totalAmount: "$100",
    paymentMethod: "Credit Card",
  };

  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const statuses = ["Success", "Failure", "Pending"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(randomStatus);
  }, []);

  return (
    // <div className="max-w-2xl mx-auto p-4 grid gap-6">
    //      <section aria-labelledby="order-confirmation-heading">
    //     <div className="bg-white p-4 rounded-lg shadow">
    //       <h2 className="text-xl font-semibold mb-4" id="order-confirmation-heading">
    //         Order Confirmation
    //       </h2>
    //       <p className="text-green-600 font-medium">Thank you for your order!</p>
    //       <p className="mt-2">
    //         Your order number is #000000. You will receive an order confirmation email with details of your order and a
    //         link to track its progress.
    //       </p>
    //       <div className="mt-6">
    //         <Button className="w-full">Continue Shopping</Button>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="max-w-2xl mx-auto p-4 grid gap-6">
    <section aria-labelledby="order-confirmation-heading">
      <div className={`bg-white p-4 rounded-lg shadow ${orderStatus === "Success" ? "border-green-500" : orderStatus === "Failure" ? "border-red-500" : "border-yellow-500"}`}>
        <h2 className={`text-xl font-semibold mb-4 text-${orderStatus === "Success" ? "green" : orderStatus === "Failure" ? "red" : "yellow"}-600`} id="order-confirmation-heading">
          {orderStatus === "Success" ? "Order Successfully Confirmed" : orderStatus === "Failure" ? "Order Failed" : "Order Pending"}
        </h2>
        <p className={`font-medium text-${orderStatus === "Success" ? "green" : orderStatus === "Failure" ? "red" : "yellow"}-600`}>
          {orderStatus === "Success" ? "Thank you for your order!" : orderStatus === "Failure" ? "Sorry, your order failed." : "Your order is pending."}
        </p>
        <p className="mt-2">
          Your order number is {orderDetails.orderNumber}. You will receive an order confirmation email with details of your order and a
          link to track its progress.
        </p>
        <p className="mt-2">
          Total Amount: {orderDetails.totalAmount}
        </p>
        <p className="mt-2">
          Payment Method: {orderDetails.paymentMethod}
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
