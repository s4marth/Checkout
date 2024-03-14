"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import {TextField, InputLabel, Button, CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
import { totalAmountState, productsState } from './recoilContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Home = () => {
    const router = useRouter();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formstatus, setFormStatus] = useState(false);
  const [total, setTotal] = useRecoilState(totalAmountState);
  const [cart, setCart] = useRecoilState(productsState);
  
  const [formdata, setFormData] = useState({
    fullname: '',
    address: '',
    city: '',
    zipcode: '',
    country: '',
    phone: '',
  });

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
          if (cart.length === 0) {
            fetchData();
        }
        }, []);


    useEffect(() => {
            let totalAmount = 0;
            cart.forEach(item => {
              totalAmount += item.price * item.quantity;
            });
            
            setTotal(totalAmount.toFixed(2));
          }, [cart]);

    const proceedToPayment = () => {
      if(formstatus)
      {
        router.push('/payment');
      }
      else{
        toast("Please fill the delivery address first!")
      }
      };

  const handleapply = ()=>{
    if (!formdata.fullname || !formdata.address || !formdata.country || !formdata.zipcode || !formdata.city || !formdata.phone) {
      toast.error('Please fill delivery details');
      return;
    }
    setFormStatus(true);
    toast("Address saved!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 style={{textAlign:'center', fontFamily: 'monospace', fontWeight: 500, letterSpacing: '.1rem', color: 'white',textDecoration: 'none',}}className="text-3xl font mb-4">Checkout</h2>

    <div className="max-w-3xl mx-auto p-4 grid gap-6">
      <section aria-labelledby="order-summary-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4" id="order-summary-heading">
            Order Summary
          </h2>
            {loading ? 
             <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px', textAlign:'center' }}>
             <CircularProgress color="primary" />
            </div>
            : (<>
                <div className="flex justify-between text-lg font-bold">
                    <span className="font-medium">Item</span>
                    <span className="font-medium">Price</span>
                    <span className="font-medium">Quantity</span>
                </div><hr />
                {cart.length===0 ? (<p className="text-gray-500">No items in your cart.</p>): (null)}
                {cart.map((item) => (
                <div className="mt-4" key={item.id}>
                 <div className="flex justify-between">
                    <img src={item.image} style={{height:'40px'}}/>
                    <span className="font-medium">${item.price}</span>
                    <span className="font-medium">X{item.quantity}</span>
                    </div>
                </div>
              ))}
            </>)}
                
          
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
            <div className="flex justify-between mt-4">
            <TextField id="standard-basic" label="Discount" variant="standard"/>   
            <Button>Apply</Button>
            </div>
           
          </div>
          <div className="mt-6">
            <Button variant='outlined' color='secondary' className="w-full" onClick={proceedToPayment}>Proceed to Payment</Button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <form className="grid gap-4">
            <div>
              <InputLabel  className="text-base" htmlFor="name">
                Full Name
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your full name"  value={formdata.fullname} onChange={(e) => setFormData({ ...formdata, fullname: e.target.value })}/>
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="address">
                Address
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your address" value={formdata.address} onChange={(e) => setFormData({ ...formdata, address: e.target.value })}/>
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="city">
                City
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your city" value={formdata.city} onChange={(e) => setFormData({ ...formdata, city: e.target.value })}/>
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="zip">
                ZIP Code
              </InputLabel>
              <TextField type='number' required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your ZIP code" value={formdata.zipcode} onChange={(e) => setFormData({ ...formdata, zipcode: e.target.value })}/>
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="country">
                Country
              </InputLabel>
              <TextField required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your country" value={formdata.country} onChange={(e) => setFormData({ ...formdata, country: e.target.value })}/>
            </div>
            <div>
              <InputLabel className="text-base" htmlFor="phone">
                Phone Number
              </InputLabel>
              <TextField type='number' required size="small" sx={{width:'100%'}} id="outlined-basic" placeholder="Enter your phone number" value={formdata.phone} onChange={(e) => setFormData({ ...formdata, phone: e.target.value })}/>
            </div>
            <div style={{textAlign:'center'}}>
              <Button sx={{width:'100%'}} variant='outlined' color='secondary' onClick={handleapply}>Save Address</Button>
            </div>
          </form>
        </div>
      </section>
      
     
    </div>

                
    <ToastContainer />
    </div>
  );
};

export default Home;