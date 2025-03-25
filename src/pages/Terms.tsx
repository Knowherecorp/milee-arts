
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Terms & Conditions</h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms and conditions carefully before using our services
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p>
            Welcome to Realism By Khushi. These terms and conditions outline the rules and regulations for the use of our website and the purchase of our products.
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you accept these terms and conditions in full. If you disagree with any part of these terms and conditions, you must not use our website.
          </p>
          
          <h2>2. Products</h2>
          <p>
            All products displayed on our website are handcrafted original artworks. Due to the nature of handmade items, there may be slight variations in color, texture, and finish from the images shown on the website. These variations are part of the unique character of handcrafted artwork and should not be considered defects.
          </p>
          
          <h2>3. Ordering & Payment</h2>
          <p>
            When placing an order, you are making an offer to purchase a product. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or problems identified by our fraud detection systems.
          </p>
          <p>
            We accept payment via credit card, debit card, and PayPal. All payments are processed securely through our payment processors. By providing your payment information, you represent and warrant that you have the legal right to use the payment method you provide.
          </p>
          
          <h2>4. Shipping & Delivery</h2>
          <p>
            We ship to addresses within the United States and selected international destinations. Shipping costs are calculated at checkout based on the shipping address and the size and weight of the items in your order.
          </p>
          <p>
            Delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs, weather conditions, or other factors outside our control.
          </p>
          
          <h2>5. Returns & Refunds</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you are not satisfied, please contact us within 14 days of receiving your order to initiate a return or exchange. Custom or commissioned artworks are not eligible for return unless damaged during shipping.
          </p>
          <p>
            To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. You will be responsible for paying the return shipping costs.
          </p>
          <p>
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          </p>
          
          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to artwork images, text, graphics, logos, and icons, is the property of Realism By Khushi and is protected by copyright and other intellectual property laws.
          </p>
          <p>
            When you purchase artwork, you are buying the physical piece, not the copyright or reproduction rights. You may not reproduce, distribute, or create derivative works from any artwork purchased from us without express written permission.
          </p>
          
          <h2>7. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
          </p>
          
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Realism By Khushi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services; or (c) unauthorized access, use, or alteration of your transmissions or content.
          </p>
          
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes indicates your acceptance of the new terms.
          </p>
          
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these terms and conditions, please contact us at:
          </p>
          <p>
            Email: hello@realismbykhushi.com<br />
            Phone: +1 (234) 567-890<br />
            Address: 123 Artisan Street, Brooklyn, NY 11201, United States
          </p>
          
          <p className="text-sm text-muted-foreground mt-12">
            Last updated: May 1, 2024
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
