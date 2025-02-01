import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentUrl, setPaymentUrl] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/products/create-payment', {
                amount: 5000, 
            });
            window.location.href = response.data.result.link;
             console.log(response.data.result.link,'respooonse axioos')
            // Redirect to Flouci payment page
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    return (
        <div>
            <h1>Pay with Flouci</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;