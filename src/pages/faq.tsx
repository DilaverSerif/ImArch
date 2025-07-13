import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

// Mock Data Import
import { faqs } from '@/data/faq';

const FAQPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Sıkça Sorulan Sorular</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        İç mimarlık hizmetlerimiz, süreçlerimiz ve genel tasarım konuları hakkında merak ettikleriniz.
      </p>

      <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Call to Action - Contact */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Sorunuz Yanıtlanmadı mı?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Aklınızdaki diğer sorular için bizimle doğrudan iletişime geçebilirsiniz.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/contact">Bize Ulaşın <Mail className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
};

export default FAQPage;
