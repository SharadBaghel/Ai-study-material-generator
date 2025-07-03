"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';  // Make sure this Button component exists in your UI library

function UpgradeSubscriptionPage() {

    const OnCheckoutClick=async()=>{
        const result=await axios.post('/api/payment/checkout',{
            priceId:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
        });
        console.log(result.data);
        window.open(result.data.url);
    }
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock function to fetch current plan and available plans from an API
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      // Replace with an actual API call
      const userCurrentPlan = { name: 'Free', status: 'Active', expiry: 'Never Expires' };
      setCurrentPlan(userCurrentPlan);
      setLoading(false);
    };

    fetchSubscriptionData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upgrade Your Subscription</h1>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Current Plan:</h2>
        <div className="mt-2 p-4 border rounded-lg">
          <p><strong>Name:</strong> {currentPlan.name}</p>
          <p><strong>Status:</strong> {currentPlan.status}</p>
          <p><strong>Expiry Date:</strong> {currentPlan.expiry}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Available Plans:</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium">Free Plan</h3>
            <p className="mt-2">Price: $0.00</p>
            <p className="mt-2">Access to basic features.</p>
            <Button onClick={() => upgradePlan({ name: 'Free' })} className="mt-4 w-full" disabled>
              Current Plan
            </Button>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium">Monthly Plan</h3>
            <p className="mt-2">Price: $9.99/month</p>
            <p className="mt-2">Access to premium features, priority support, and more.</p>
            <Button onClick={OnCheckoutClick} className="mt-4 w-full">
              Upgrade to Monthly Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeSubscriptionPage;
