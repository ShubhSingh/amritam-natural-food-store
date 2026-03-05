'use client';

import Header from '@/components/Header';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onSearch={() => {}} />
      
      {/* Page Title */}
      <div className="bg-primary-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-primary-100 mt-2">We'd love to hear from you</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Mail className="text-primary-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a 
                      href="mailto:support@amritamnatural.com" 
                      className="text-primary-600 hover:text-primary-700"
                    >
                      support@amritamnatural.com
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Phone className="text-primary-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a 
                      href="tel:+911234567890" 
                      className="text-primary-600 hover:text-primary-700"
                    >
                      +91 123 456 7890
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Mon-Sat, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <MapPin className="text-primary-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-700">
                      Amritam Natural<br />
                      123 Organic Street<br />
                      Green Valley, Mumbai<br />
                      Maharashtra 400001, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Clock className="text-primary-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">How do I place an order?</h3>
                <p className="text-gray-700">
                  Simply browse our products, click on any item you like, and you'll see purchase links for Amazon, Flipkart, Swiggy Instamart, and Blinkit. Choose your preferred platform and complete your purchase there.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Do you deliver products directly?</h3>
                <p className="text-gray-700">
                  We don't handle delivery ourselves. All orders are fulfilled through our partner platforms (Amazon, Flipkart, Swiggy, Blinkit), ensuring reliable and fast delivery to your doorstep.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Are all products certified organic?</h3>
                <p className="text-gray-700">
                  Yes! Every product listed on Amritam Natural is 100% certified organic and free from harmful pesticides and chemicals.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">What if I have issues with my order?</h3>
                <p className="text-gray-700">
                  For order-related issues, please contact the platform where you made your purchase (Amazon, Flipkart, Swiggy, or Blinkit). For product quality concerns, feel free to reach out to us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob