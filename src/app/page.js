"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import {TextField, InputLabel, Button } from '@mui/material';




const Home = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
              }
              const data = await response.json();
              console.log("data", data)
              setCart(data.products)
              setPaymentMethods(data.paymentMethods)
            } catch (error) {
              console.error('Error fetching cart:', error);
            } finally {
              setLoading(false);
            }
          };
          fetchData();
          
        }, []);


    useEffect(() => {
            let totalAmount = 0;
            cart.forEach(item => {
              totalAmount += item.price * item.quantity;
            });
            setTotal(totalAmount);
          }, [cart]);

    
      if (cart.length === 0) {
        return <div>No products in cart</div>;
      }

      const proceedToPayment = () => {
        // router.push({
        //     pathname: '/payment',
        //     query: { totalAmount: total } // Pass total amount as query parameter
        //   });
          router.push('/payment', { totalAmount: total, paymentMethods: paymentMethods });
        
      };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 style={{textAlign:'center'}}className="text-2xl font-bold mb-4">Checkout</h2>

<div className="max-w-2xl mx-auto p-4 grid gap-6">
      <section aria-labelledby="order-summary-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4" id="order-summary-heading">
            Order Summary
          </h2>
            {loading ? <p>Loading...</p> : (<>
                <div className="flex justify-between text-lg font-bold">
                    <span className="font-medium">Item</span>
                    <span className="font-medium">Price</span>
                    <span className="font-medium">Quantity</span>
                </div>
                {cart.map((item) => (
                <div className="mt-4" key={item.id}>
                 <div className="flex justify-between">
                    <img src={item.image} style={{height:'30px'}}/>
                    <span className="font-medium">${item.price}</span>
                    <span className="font-medium">X{item.quantity}</span>
                    </div>
                </div>
              ))}
            </>)}

          <p className="text-gray-500">No items in your cart.</p>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">${total}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tax</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">${total}</span>
            </div>
          </div>
          <div className="mt-6">
            <Button variant='contained' className="w-full" onClick={proceedToPayment}>Proceed to Payment</Button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <form className="grid gap-4">
            <div>
              <InputLabel  className="text-base" htmlFor="name">
                Full Name
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your full name" />
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="address">
                Address
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your address" />
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="city">
                City
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your city" />
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="zip">
                ZIP Code
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your ZIP code" />
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="country">
                Country
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your country" />
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="phone">
                Phone Number
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your phone number" />
            </div>
            <div style={{textAlign:'center'}}>
              <Button sx={{width:'100%'}} type='submit' variant='contained'>Save Address</Button>
            </div>
          </form>
        </div>
      </section>
      
     
    </div>

                

    </div>
  );
};

export default Home;