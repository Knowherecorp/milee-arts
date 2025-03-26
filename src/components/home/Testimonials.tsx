
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

const Testimonials = () => {
  // Will be populated with real testimonials later
  const testimonials: any[] = [];

  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">What Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our customers have to say about their experience with our products and services.
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow hover-scale">
                <CardContent className="p-6">
                  <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="mb-4 italic text-muted-foreground">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted mr-3">
                      {testimonial.avatar && (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">
              Add testimonials to showcase customer feedback.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
