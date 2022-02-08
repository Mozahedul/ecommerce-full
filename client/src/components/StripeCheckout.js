import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link } from 'react-router-dom';

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  useEffect(() => {
    createPaymentIntent(user.token).then(res => {
      console.log('create payment intent', res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you will get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      console.log(
        'PaymentIntent Object ===> ',
        JSON.stringify(payload, null, 4)
      );
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async e => {
    // Listen for changes in the cart element
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <>
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successful.
        <Link to="/user/history">See it in your purchase history</Link>
      </p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="cart-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;
