import React from 'react';
import { IoRocketSharp, IoHeadset, IoRepeat } from 'react-icons/io5';
import Layout from '../../layout/Layout';

const Service = () => {
  return (
    <Layout title="Service - SwiftPick"> 
    <div className="  px-4 sm:px-6 lg:px-8 py-20">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We offer a range of customer-centric services to make your shopping experience exceptional.
        </p>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1: Free Shipping */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <IoRocketSharp className="text-indigo-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
            Free Shipping
          </h2>
          <p className="text-gray-600 mb-4">
            Enjoy free shipping on all orders above $50. Get your products delivered at your doorstep without any additional cost.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Service 2: 24/7 Customer Support */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <IoHeadset className="text-indigo-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
            24/7 Customer Support
          </h2>
          <p className="text-gray-600 mb-4">
            Our support team is available around the clock to assist you with any questions or issues regarding your order.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Contact Us
          </button>
        </div>

        {/* Service 3: Easy Returns */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <IoRepeat className="text-indigo-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
            Easy Returns
          </h2>
          <p className="text-gray-600 mb-4">
            Not satisfied with your purchase? No problem! We offer a hassle-free 30-day return policy for all products.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Return Policy
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Service;

