
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will get back to you soon.');
    e.currentTarget.reset();
  };
  
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Reach out with any questions or inquiries.
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-serif font-medium mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Whether you have questions about a specific artwork, commissioning a custom piece, or just want to say hello, fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select name="subject" defaultValue="general">
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="order">Order Status</SelectItem>
                    <SelectItem value="commission">Commission Request</SelectItem>
                    <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          
          <div>
            <div className="bg-secondary/30 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-serif font-medium mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:hello@realismbykhushi.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@realismbykhushi.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Studio Address</p>
                    <address className="text-muted-foreground not-italic">
                      123 Artisan Street<br />
                      Brooklyn, NY 11201<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-8">
              <h3 className="text-xl font-serif font-medium mb-4">Studio Hours</h3>
              <p className="text-muted-foreground mb-4">
                Our studio is open for appointments and viewings during the following hours:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>11:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Please note that studio visits are by appointment only. Contact us to schedule a viewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
