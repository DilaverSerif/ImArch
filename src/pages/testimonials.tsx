import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Quote } from 'lucide-react';

// Mock Data Import
import { testimonials } from '@/data/testimonials';

const TestimonialsPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Müşteri Yorumları</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Müşterilerimizin Bladon Mimarlık ile olan deneyimleri ve projelerimiz hakkındaki düşünceleri.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6 flex flex-col items-center text-center shadow-md rounded-xl bg-card hover:shadow-xl transition-shadow duration-300">
            <Quote className="h-10 w-10 text-primary mb-4" />
            <p className="text-muted-foreground italic text-lg mb-4 leading-relaxed">"{testimonial.quote}"</p>
            <Separator className="w-24 bg-border/60 my-4" />
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-primary"
            />
            <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;
