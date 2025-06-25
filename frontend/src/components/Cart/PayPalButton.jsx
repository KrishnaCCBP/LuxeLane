import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

export default function PayPalButton({ amount, onSuccess, onError }) {
  console.log("PayPal Client ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);
  console.log("PayPal Amount:", amount);
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency : "USD"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2), currency_code:"USD" } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}
