"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Button, TextField, Grid, Modal, Box} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const PaymentPage = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
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
    console.log("handle card submit called")
    router.push('/confirmation');
  };

  const handleUPIFormSubmit = () => {
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



  return (

    <div className="container mx-auto px-4 py-8">
    <div className="mb-4">
      {loading ? (
        <p>Loading payment methods...</p>
      ) : (
        <div className="max-w-2xl mx-auto p-4 grid gap-6">
        <section className="bg-white shadow-md p-6 rounded-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">Choose Payment Options</h2>
            <h2 className="text-xl font-semibold mb-4">Total: $566</h2>
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
          </section>
          <Modal open={showCardForm || showUPIForm} onClose={() => setShowCardForm(false) || setShowUPIForm(false)}>
              <Box sx={{ width: 400, bgcolor: 'background.paper', borderRadius: 4, p: 4, margin: 'auto', mt: 8 }}>
                {showCardForm && (
                  <form>
                    <TextField required label="Card Number" fullWidth margin="normal" value={cardFormData.cardNumber} onChange={(e) => setCardFormData({ ...cardFormData, cardNumber: e.target.value })} />
                    <TextField required label="Expiry Date" fullWidth margin="normal" value={cardFormData.expiryDate} onChange={(e) => setCardFormData({ ...cardFormData, expiryDate: e.target.value })} />
                    <TextField required label="CVV" fullWidth margin="normal" value={cardFormData.cvv} onChange={(e) => setCardFormData({ ...cardFormData, cvv: e.target.value })} />
                    <TextField required label="Name on Card" fullWidth margin="normal" value={cardFormData.nameOnCard} onChange={(e) => setCardFormData({ ...cardFormData, nameOnCard: e.target.value })} />
                    <Button onClick={handleCardFormSubmit} variant="contained" color="primary">Submit</Button>
                  </form>
                )}
                {showUPIForm && (
                  <form>
                    <TextField required label="UPI ID" fullWidth margin="normal" value={upiFormData.upiID} onChange={(e) => setUPIFormData({ ...upiFormData, upiID: e.target.value })} />
                    <Button onClick={handleUPIFormSubmit} variant="contained" color="primary">Submit</Button>
                  </form>
                )}
              </Box>
            </Modal>
          </div>
      )}
    </div>
  </div>
  );
};

export default PaymentPage;
