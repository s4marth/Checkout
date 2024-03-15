"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Button, TextField, Grid, Modal, Box, CircularProgress} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { useRecoilValue } from "recoil";
import { totalAmountState, paymentmethodstate } from '../recoilContextProvider';
import { useRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useRecoilState(paymentmethodstate);


  const [cardFormData, setCardFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const [upiFormData, setUPIFormData] = useState({
    upiID: '',
  });

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
    if (method === 'UPI') {
      setShowUPIForm(true);
      setShowCardForm(false);
    } else if (method === 'Credit/Debit Card') {
      setShowCardForm(true);
      setShowUPIForm(false);
    }
  };

  const handleCardFormSubmit = () => {
    if (!cardFormData.cardNumber || !cardFormData.expiryDate || !cardFormData.cvv || !cardFormData.nameOnCard) {
      toast.error('Please fill in all the fields');
      return;
    }
    router.push('/confirmation');
  };

  const handleUPIFormSubmit = () => {
    if (!upiFormData.upiID) {
      toast.error('Please fill in the UPI ID');
      return;
    }
    router.push('/confirmation');
  };

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

  const totalAmountss = useRecoilValue(totalAmountState);
  console.log("this is recoil", totalAmountss)

  return (

    <div className="container mx-auto px-4 py-8">
    <div className="mb-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px', textAlign:'center' }}>
        <CircularProgress color="primary" />
       </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 grid gap-6">
        <section className="bg-white shadow-md p-6 rounded-md mt-8">
            <h2 style={{textAlign:'center'}} className="text-2xl font-semibold mb-4">Payment</h2>
            <h3 className="text-xl font-semibold mb-4">Choose Payment Options</h3>
            <h3 className="text-xl font-semibold mb-4">Total: ${totalAmountss}</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <Button variant='outlined' color='primary' sx={{width:'100%'}} onClick={() => handleMethodSelection('Credit/Debit Card')}>
                Credit/Debit Card
                <CreditCardIcon sx={{marginLeft:'5px'}}/>
              </Button>
              <Button color='primary' variant="outlined" sx={{width:'100%'}} onClick={() => handleMethodSelection('UPI')}>
                UPI
                <MobileFriendlyIcon sx={{marginLeft:'5px'}}/>
              </Button>
            </div>
            <Grid sx={{marginTop:'auto'}} container spacing={2} display='flex' justifyContent='center'>
              <Grid item>
                <img height='70px' width='70px' src='https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/mastercard-512.png'></img>
              </Grid>
              <Grid item>
                <img height='70px' width='70px' src='https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/visa-256.png'></img>
              </Grid>
              <Grid item>
                <img height='70px' width='70px' src='https://cdn0.iconfinder.com/data/icons/payment-method/480/rupay_payment_card_bank-512.png'></img>
              </Grid>
              <Grid item>
                <img height='70px' width='70px' src='https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/american_express-64.png'></img>
              </Grid>
            </Grid>
          </section>
          <Modal open={showCardForm || showUPIForm} onClose={() => setShowCardForm(false) || setShowUPIForm(false)}>
              <Box sx={{ width: 400, bgcolor: 'background.paper', borderRadius: 4, p: 4, margin: 'auto', mt: 8 }}>
                {showCardForm && (
                  <form>
                    <h3 className="text-xl font-semibold"> Card Details <CreditCardIcon sx={{marginLeft:'5px'}}/></h3>
                    <TextField type='number' required label="Card Number" fullWidth margin="normal" value={cardFormData.cardNumber} onChange={(e) => setCardFormData({ ...cardFormData, cardNumber: e.target.value })} />
                    <TextField type='date' required  fullWidth margin="normal" value={cardFormData.expiryDate} onChange={(e) => setCardFormData({ ...cardFormData, expiryDate: e.target.value })} />
                    <TextField type='number' required label="CVV" fullWidth margin="normal" value={cardFormData.cvv} onChange={(e) => setCardFormData({ ...cardFormData, cvv: e.target.value })} />
                    <TextField required label="Name on Card" fullWidth margin="normal" value={cardFormData.nameOnCard} onChange={(e) => setCardFormData({ ...cardFormData, nameOnCard: e.target.value })} />
                    <Button sx={{margin:'auto'}} onClick={handleCardFormSubmit} variant="outlined" color="primary">Submit</Button>
                  </form>
                )}
                {showUPIForm && (
                  <form>
                    
                    <h3 className="text-xl font-semibold">UPI Details </h3>
                    <TextField required label="UPI ID" fullWidth margin="normal" value={upiFormData.upiID} onChange={(e) => setUPIFormData({ ...upiFormData, upiID: e.target.value })} />
                    <Button onClick={handleUPIFormSubmit} variant="outlined" color="primary">Submit</Button>
                  </form>
                )}
              </Box>
            </Modal>
          </div>
      )}
    </div>
    <ToastContainer />
  </div>
  );
};

export default PaymentPage;
