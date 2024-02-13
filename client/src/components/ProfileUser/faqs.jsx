import React from "react";

const FAQs = (props) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">FAQs</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">What happens when I update my email address (or mobile number)?</h3>
        <p className="text-gray-700">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">What happens to my existing FrameFusion account when I update my email address (or mobile number)?</h3>
        <p className="text-gray-700">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Does my Seller account get affected when I update my email address?</h3>
        <p className="text-gray-700">FrameFusion has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
      </div>
    </div>
  );
};

export default FAQs;
