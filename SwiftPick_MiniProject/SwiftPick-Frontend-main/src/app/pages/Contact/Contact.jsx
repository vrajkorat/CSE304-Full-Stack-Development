import React from "react";
import { IoCall, IoMail, IoLocation } from "react-icons/io5"; // Icons for contact info
import Layout from "../../layout/Layout";

const Contact = () => {
  return (
    <Layout title="Conatct - SwiftPick">
      <div className=" mt-20  px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We would love to hear from you! Please fill out the form or reach us
            using the details below.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Card 1 */}
            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                <IoCall className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">Phone</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                <IoMail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">Email</h3>
                <p className="text-sm text-gray-600">info@example.com</p>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
                <IoLocation className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">
                  Location
                </h3>
                <p className="text-sm text-gray-600">
                  123 Main St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
