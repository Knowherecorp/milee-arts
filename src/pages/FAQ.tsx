
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our artwork and services
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">Are all your artworks original?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, each piece in our collection is an original, handcrafted artwork created by artist Khushi Sharma. We do not sell prints or reproductions. When you purchase from Realism By Khushi, you're getting a unique, one-of-a-kind piece.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">How do I care for my artwork?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-2">Each type of artwork requires specific care:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Paintings: Keep away from direct sunlight and excessive humidity. Dust gently with a soft, dry cloth.</li>
                  <li>Sculptures: Dust regularly with a soft brush. Avoid placing in high-traffic areas where they might be bumped.</li>
                  <li>Resin Art: Clean with a soft, damp cloth. Avoid abrasive cleaners and direct sunlight for prolonged periods.</li>
                </ul>
                <p className="mt-2">Every artwork comes with specific care instructions tailored to the piece.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">Do you offer custom commissions?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, we offer custom commissions for clients who want a unique piece designed specifically for their space or vision. The commission process typically involves a consultation to discuss your ideas, a proposal with sketches or concepts, and regular updates throughout the creation process. Please <Link to="/contact" className="text-primary hover:underline">contact us</Link> to inquire about commissioning a custom artwork.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">What is your shipping policy?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                We offer free standard shipping on all orders within the continental United States. International shipping is available at calculated rates. All artwork is professionally packaged to ensure safe delivery. For more details, please visit our <Link to="/shipping" className="text-primary hover:underline">Shipping & Returns</Link> page.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">Can I return artwork if I'm not satisfied?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, we accept returns within 14 days of delivery if you're not completely satisfied with your purchase. The artwork must be in its original condition and packaging. Custom or commissioned pieces are not eligible for return unless damaged during shipping. Please refer to our <Link to="/shipping" className="text-primary hover:underline">Shipping & Returns</Link> page for the complete return process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">What if my artwork arrives damaged?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                In the rare event that your artwork arrives damaged, please contact us within 48 hours of delivery with photos of the damage. We will work with you to resolve the issue promptly, either by replacing the item or providing a refund. All of our shipments are insured, so please do not discard the packaging or the artwork until the claim is resolved.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">Are Certificates of Authenticity provided?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, every artwork comes with a signed Certificate of Authenticity that verifies its originality and provides details about the piece, including title, date created, materials used, and care instructions. This certificate is an important document for provenance and should be kept with the artwork.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">How do I hang my artwork properly?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                <p className="mb-2">For proper hanging:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use appropriate hardware based on the weight of your artwork</li>
                  <li>Hang at eye level (typically 58-60 inches from the floor to the center of the artwork)</li>
                  <li>Use two hanging points for larger pieces to ensure stability</li>
                  <li>Avoid hanging in direct sunlight or areas with high humidity</li>
                </ul>
                <p className="mt-2">If you're unsure about hanging your specific piece, please contact us for guidance.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">Do you ship internationally?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, we ship to select international destinations. International shipping rates are calculated at checkout based on the destination country, package weight, and dimensions. Please note that international orders may be subject to import duties, taxes, and customs clearance fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping fees.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-serif py-4">How can I stay updated on new artwork releases?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                The best way to stay informed about new artwork releases is to subscribe to our newsletter. Subscribers receive early access to new collections, exclusive offers, and studio updates. You can subscribe using the form in the footer of our website. You can also follow us on social media for regular updates and behind-the-scenes content.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-serif font-medium mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              If you couldn't find the answer you were looking for, feel free to reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Us
              </Link>
              <a 
                href="mailto:hello@realismbykhushi.com"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-2.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
