"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PaymentPage = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('');
   const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }
        const data = await response.json();
        setPaymentMethods(data.paymentMethods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);


  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handlePaymentSubmit = () => {
    // Implement payment submission logic
    if (selectedMethod) {
      // Proceed to further steps
      router.push('/confirmation');
    } else {
      alert('Please select a payment method.');
    }
  };

  return (

    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
      {/* <p className="font-bold">${totalAmount}</p> */}
    </div>
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Payment Methods</h3>
      {loading ? (
        <p>Loading payment methods...</p>
      ) : (
        <div>
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`method_${index}`}
                name="paymentMethod"
                value={method}
                checked={selectedMethod === method}
                onChange={handleMethodChange}
                className="mr-2"
              />
              <label htmlFor={`method_${index}`}>{method}</label>
            </div>
          ))}
        </div>
      )}
    </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handlePaymentSubmit}>
      Proceed
    </button>
    <div className="max-w-2xl mx-auto p-4 grid gap-6">
    <section className="bg-white shadow-md p-6 rounded-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Button variant='outlined' color='primary' sx={{width:'100%'}}>
            Credit/Debit Card
            <CreditCardIcon />
          </Button>
          <Button ccolor='primary' variant="outlined" sx={{width:'100%'}}>
            UPI
          </Button>
        </div>
      </section>
      </div>
  </div>
  );
};

export default PaymentPage;
