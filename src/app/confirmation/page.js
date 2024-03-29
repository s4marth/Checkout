"use client";
import { useEffect, useState } from 'react';
import {Button } from '@mui/material';
import { useRecoilValue } from "recoil";
import { totalAmountState, productsState, paymentmethodstate } from '../recoilContextProvider';

const ConfirmationPage = () => {
 
  const totalAmountss = useRecoilValue(totalAmountState);
   const productinart = useRecoilValue(productsState);
   const paymethod = useRecoilValue(paymentmethodstate);
  const orderDetails = {
    orderNumber: "#000000",
    totalAmount: totalAmountss,
    paymentMethod: paymethod,
  };


  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const statuses = ["Success", "Failure", "Pending"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(randomStatus);
   
  }, []);

  const getStatusColor = () => {
    switch (orderStatus) {
      case "Success":
        return "green";
      case "Failure":
        return "red";
      case "Pending":
        return "orange";
      default:
        return "black";
    }
  };



  return (
  
    <div className="max-w-2xl mx-auto p-4 grid gap-6 mt-10">
    <section aria-labelledby="order-confirmation-heading">
      <div className={`bg-white p-4 rounded-lg shadow ${orderStatus === "Success" ? "border-green-500" : orderStatus === "Failure" ? "border-red-500" : "border-yellow-500"}`}>
        <h2 className={`text-xl font-semibold mb-4 `} id="order-confirmation-heading" style={{color:getStatusColor(), textAlign:'center'}}>
         Order Status: {orderStatus}
        </h2>
        <p className={`font-medium text-${orderStatus === "Success" ? "green" : orderStatus === "Failure" ? "red" : "yellow"}-600`}>
          {orderStatus === "Success" ? "Thank you for your order!" : orderStatus === "Failure" ? "Sorry, your order failed." : "Your order is pending."}
        </p>
        <p className="mt-2">
          Your order number is {orderDetails.orderNumber}. You will receive an order confirmation email with details of your order and a
          link to track its progress.
        </p>
        <p className="mt-2">
          Total Amount: <b>${orderDetails.totalAmount}</b>
        </p>
        <p className="mt-2">
          Payment Method: <b>{orderDetails.paymentMethod}</b>
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
