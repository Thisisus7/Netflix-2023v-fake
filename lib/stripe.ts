import {
    createCheckoutSession,
    getStripePayments,
  } from '@stripe/firestore-stripe-payments';
  import { getFunctions, httpsCallable } from '@firebase/functions';
  import app from './firebase';
  
  // retrieve payments
  const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
  });
  
  const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
      price: priceId,
       // window: send url of your current window(e.g. localhost.3000) 
      success_url: window.location.origin,  // actual domain
      cancel_url: window.location.origin,
    })
      .then((snapshot) => window.location.assign(snapshot.url))  // stripe payment
      .catch((error) => console.log(error.message));
  };
  
  const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'us-central1');
    const functionRef = httpsCallable(
      instance,
      'ext-firestore-stripe-payments-createPortalLink'
    );
  
    await functionRef({
      returnUrl: `${window.location.origin}/account`,
    })
      .then(({ data }: any) => window.location.assign(data.url))
      .catch((error) => console.log(error.message));
  };
  
  export { loadCheckout, goToBillingPortal };
  export default payments;