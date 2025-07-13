import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, Palette, Layout, DraftingCompass, Camera, HardHat, ArrowRight } from 'lucide-react';

// Mock Data Import
import { services } from '@/data/services';

const ServicesPage: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="h-8 w-8" />;
      case 'Palette': return <Palette className="h-8 w-8" />;
      case 'Layout': return <Layout className="h-8 w-8" />;
      case 'DraftingCompass': return <DraftingCompass className="h-8 w-8" />;
      case 'Camera': return <Camera className="h-8 w-8" />;
      case 'HardHat': return <HardHat className="h-8 w-8" />;
      default: return <Lightbulb className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Hizmetlerimiz</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Bladon Mimarlık olarak, iç mekan tasarımının her aşamasında size özel, yenilikçi ve fonksiyonel çözümler sunuyoruz.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.id} className="p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
              {getIcon(service.icon)}
            </div>
            <CardTitle className="text-2xl font-semibold mb-3">{service.title}</CardTitle>
            <CardContent className="text-muted-foreground text-base leading-relaxed">
              {service.description}
            </CardContent>
            <ul className="text-left text-sm text-muted-foreground mt-4 space-y-1 w-full">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Separator className="my-12 bg-border/60" />

      {/* Call to Action - Work Process */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Çalışma Sürecimizi Keşfedin</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Projelerinizi nasıl hayata geçirdiğimizi adım adım öğrenin. Şeffaf ve işbirlikçi bir süreçle size en iyi deneyimi sunuyoruz.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/process">Süreci İncele <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
};

export default ServicesPage;
