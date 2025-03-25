
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';

const Shipping = () => {
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Shipping & Returns</h1>
            <p className="text-lg text-muted-foreground">
              Information about our shipping policies and return procedures
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h2>Shipping Information</h2>
          
          <h3>Domestic Shipping (United States)</h3>
          <p>
            We are pleased to offer free standard shipping on all orders within the continental United States. Orders typically ship within 3-5 business days after payment confirmation and are delivered via insured courier service.
          </p>
          <ul>
            <li><strong>Standard Shipping:</strong> Free - Delivery in 5-7 business days</li>
            <li><strong>Expedited Shipping:</strong> $35 - Delivery in 2-3 business days</li>
            <li><strong>Overnight Shipping:</strong> $75 - Next business day delivery (order must be placed before 12pm EST)</li>
          </ul>
          <p>
            For orders shipping to Alaska, Hawaii, or U.S. territories, additional shipping charges may apply.
          </p>
          
          <h3>International Shipping</h3>
          <p>
            We ship to select international destinations. International shipping rates are calculated at checkout based on the destination country, package weight, and dimensions. Please note that international orders may be subject to import duties, taxes, and customs clearance fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping fees.
          </p>
          <p>
            International orders typically take 7-14 business days to arrive, but delivery times can vary depending on customs processing in the destination country.
          </p>
          
          <h3>Shipping Artwork Safely</h3>
          <p>
            All artwork is professionally packaged to ensure it arrives in perfect condition:
          </p>
          <ul>
            <li>Paintings are wrapped in acid-free tissue paper, covered with protective foam or bubble wrap, and shipped in sturdy, custom-sized boxes.</li>
            <li>Sculptures are carefully wrapped with protective materials, cushioned with foam inserts, and placed in double-walled boxes.</li>
            <li>Resin art is thoroughly protected with multiple layers of bubble wrap and foam to prevent damage during transit.</li>
          </ul>
          <p>
            Each shipment includes a Certificate of Authenticity and care instructions for your artwork.
          </p>
          
          <h3>Tracking Your Order</h3>
          <p>
            Once your order ships, you will receive a confirmation email with tracking information. You can also view your order status and tracking details in your account dashboard if you've created an account with us.
          </p>
          
          <h2>Return Policy</h2>
          
          <h3>Return Eligibility</h3>
          <p>
            We want you to be completely satisfied with your purchase. If for any reason you are not happy with your artwork, you may return it within 14 days of delivery, subject to the following conditions:
          </p>
          <ul>
            <li>The artwork must be in its original condition</li>
            <li>All original packaging materials must be included</li>
            <li>A return authorization must be obtained by contacting our customer service team</li>
          </ul>
          <p>
            Please note that custom or commissioned artworks are not eligible for return unless damaged during shipping.
          </p>
          
          <h3>Damaged or Defective Items</h3>
          <p>
            If your artwork arrives damaged or defective, please contact us within 48 hours of delivery with photos of the damage. We will work with you to resolve the issue promptly, either by replacing the item or providing a refund.
          </p>
          
          <h3>Return Process</h3>
          <p>
            To initiate a return:
          </p>
          <ol>
            <li>Contact our customer service team at returns@realismbykhushi.com or call +1 (234) 567-890</li>
            <li>You will receive a Return Authorization Number and return shipping instructions</li>
            <li>Carefully repackage the artwork in its original packaging</li>
            <li>Include the Return Authorization Number on the outside of the package</li>
            <li>Ship the package using the method specified in the return instructions</li>
          </ol>
          <p>
            For returns due to customer preference, the customer is responsible for return shipping costs. For damaged or defective items, we will cover the return shipping costs.
          </p>
          
          <h3>Refund Process</h3>
          <p>
            Once we receive and inspect the returned artwork, we will process your refund. Refunds will be issued to the original payment method within 10 business days. The refund will include the purchase price of the artwork but not the original shipping costs (unless the return is due to a defect or damage).
          </p>
          <p>
            If you have any questions about our shipping or return policies, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <p className="text-sm text-muted-foreground mt-12">
            Last updated: May 1, 2024
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shipping;
