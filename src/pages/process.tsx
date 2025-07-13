import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, DraftingCompass, Paintbrush, HardHat, CheckCircle, ArrowRight } from 'lucide-react';

const ProcessPage: React.FC = () => {
  const processSteps = [
    {
      id: 1,
      icon: Lightbulb,
      title: '1. Keşif ve Konsept Geliştirme',
      description: 'Projenizin başlangıç aşamasında, ihtiyaçlarınızı, beklentilerinizi ve yaşam tarzınızı anlamak için detaylı bir keşif yaparız. Bu bilgiler ışığında, projenizin temelini oluşturacak özgün konseptler ve fikirler geliştiririz.',
      image: 'https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      icon: DraftingCompass,
      title: '2. Tasarım ve Planlama',
      description: 'Geliştirilen konseptler doğrultusunda, 2D ve 3D çizimler, kat planları ve görselleştirmelerle projenizi detaylandırırız. Malzeme, renk ve mobilya seçimlerini yaparak, mekanın her köşesini titizlikle planlarız.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      icon: Paintbrush,
      title: '3. Uygulama ve Yönetim',
      description: 'Tasarım onaylandıktan sonra, projenin uygulama aşamasına geçeriz. Alanında uzman ekiplerle çalışarak, tüm imalat ve montaj süreçlerini yönetir, projenin belirlenen standartlarda ve zamanında tamamlanmasını sağlarız.',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      icon: HardHat,
      title: '4. Denetim ve Kalite Kontrol',
      description: 'Uygulama süreci boyunca düzenli denetimler yaparak, projenin tasarım detaylarına ve kalite standartlarına uygun ilerlediğinden emin oluruz. Her aşamada titizlikle çalışarak mükemmel sonuçlar hedefleriz.',
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      icon: CheckCircle,
      title: '5. Teslimat ve Son Dokunuşlar',
      description: 'Proje tamamlandığında, mekanın son kontrollerini yapar ve size anahtar teslimi gerçekleştiririz. Hayalinizdeki mekanın gerçeğe dönüştüğünü görmek, bizim için en büyük mutluluktur.',
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Çalışma Sürecimiz</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Projelerinizi hayata geçirirken izlediğimiz şeffaf ve işbirlikçi adımlar.
      </p>

      <div className="relative">
        {processSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-16 last:mb-0">
            <div className={`flex-shrink-0 w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
            </div>
            <div className={`flex-grow w-full lg:w-1/2 space-y-4 ${index % 2 === 0 ? 'lg:order-2 lg:text-left' : 'lg:order-1 lg:text-right'}`}>
              <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">{step.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-12 bg-border/60" />

      {/* Call to Action - Get a Quote */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Projenizi Başlatmaya Hazır Mısınız?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Çalışma sürecimiz hakkında daha fazla bilgi almak veya projeniz için özel bir teklif almak için bizimle iletişime geçin.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/contact">Teklif Alın <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
};

export default ProcessPage;
