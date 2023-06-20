export const fetchPaymentSheetParams = async () => {
  // Fetch payment sheet parameters from your server
  const response = await fetch(
    'https://stripe-20s9.onrender.com/create-payment-intent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 5000,
        currency: 'EGP',
      }),
    },
  );
  const {clientSecret, ephemeralKey, customer} = await response.json();
  console.log(clientSecret, ephemeralKey, customer);
  return {
    clientSecret,
    ephemeralKey,
    customer,
  };
};
