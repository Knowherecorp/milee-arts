
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">What Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Customer testimonials will appear here once received.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-md transition-shadow hover-scale">
            <CardContent className="p-6 text-center">
              <p className="text-base mb-4 italic text-muted-foreground">
                No testimonials yet. Customer reviews will be displayed here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
