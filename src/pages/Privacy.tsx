
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              How we collect, use, and protect your information
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p>
            At Realism By Khushi, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul>
            <li>Create an account</li>
            <li>Make a purchase</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>
            The types of information we may collect include:
          </p>
          <ul>
            <li>Name, email address, postal address, phone number</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Account login credentials</li>
            <li>Purchase history and preferences</li>
            <li>Communications with us</li>
          </ul>
          <p>
            We also automatically collect certain information when you visit our website, including:
          </p>
          <ul>
            <li>Log information (IP address, browser type, pages visited, time spent)</li>
            <li>Device information (hardware model, operating system)</li>
            <li>Location information</li>
            <li>Cookies and similar technologies</li>
          </ul>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders, products, and services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and customer experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Protect against fraud and unauthorized transactions</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>3. Information Sharing</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers who perform services on our behalf (payment processors, shipping companies)</li>
            <li>Professional advisors (lawyers, accountants, insurers)</li>
            <li>Government or regulatory authorities when required by law</li>
            <li>In connection with a business transfer, merger, or acquisition</li>
          </ul>
          <p>
            We do not sell or rent your personal information to third parties for their marketing purposes.
          </p>
          
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, no data transmission over the internet or electronic storage system is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2>5. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience on our website, understand usage patterns, and improve our services. You can manage your cookie preferences through your browser settings.
          </p>
          
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Objection to certain processing activities</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected information from a child under 16, please contact us immediately.
          </p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a revised effective date.
          </p>
          
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence, which may have different data protection laws. We will take appropriate measures to ensure your information remains protected in accordance with this Privacy Policy.
          </p>
          
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            Email: privacy@realismbykhushi.com<br />
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

export default Privacy;
