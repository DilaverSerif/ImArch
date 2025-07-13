import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Lightbulb, Palette, Layout, Users, Sparkles } from 'lucide-react';

// Mock Data Imports
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Modern Interior Design"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="relative z-10 text-white p-6 max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Bladon Mimarlık: Mekanlara Ruh Katıyoruz
          </h1>
          <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
            Estetik ve fonksiyonelliği bir araya getirerek, hayallerinizdeki yaşam ve çalışma alanlarını tasarlıyoruz.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button asChild className="px-8 py-3 text-lg rounded-full bg-light-bronze hover:bg-light-bronze/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link to="/portfolio">Portföyümüzü Keşfedin <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-lg rounded-full border-2 border-white text-white bg-transparent hover:bg-white/20 shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link to="/contact">Proje Teklifi Alın</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Hizmetlerimiz</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          İç mekan tasarımında geniş bir yelpazede hizmet sunarak, her projenin benzersiz ihtiyaçlarına özel çözümler üretiyoruz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <Card key={service.id} className="p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                {service.icon === 'Lightbulb' && <Lightbulb className="h-8 w-8" />}
                {service.icon === 'Palette' && <Palette className="h-8 w-8" />}
                {service.icon === 'Layout' && <Layout className="h-8 w-8" />}
                {/* Add more icon mappings as needed */}
              </div>
              <CardTitle className="text-xl font-semibold mb-2">{service.title}</CardTitle>
              <CardContent className="text-muted-foreground text-sm">
                {service.description.substring(0, 120)}...
              </CardContent>
              <Button asChild variant="link" className="mt-4 text-primary hover:text-primary/80">
                <Link to="/services">Daha Fazla Bilgi <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12 bg-border/60" />

      {/* Featured Projects Slider */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Öne Çıkan Projelerimiz</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          En beğenilen ve ilham veren projelerimizden seçkiler. Her biri, tasarım felsefemizin bir yansımasıdır.
        </p>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {projects.slice(0, 5).map((project) => (
              <CarouselItem key={project.id}>
                <div className="p-1">
                  <Card className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <CardHeader className="text-left">
                      <CardTitle className="text-2xl font-semibold">{project.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{project.description.substring(0, 100)}...</p>
                    </CardHeader>
                    <CardContent className="text-left pb-6">
                      <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-white">
                        <Link to={`/portfolio/${project.slug}`}>Projeyi İncele <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Button asChild variant="outline" className="mt-12 px-8 py-3 text-lg rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary/10 shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/portfolio">Tüm Portföyü Görüntüle</Link>
        </Button>
      </section>

      <Separator className="my-12 bg-border/60" />

      {/* About Me/Vision Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Our Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-3xl font-bold drop-shadow-md">Vizyonumuz</h3>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Bladon Mimarlık Felsefesi</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Bladon Mimarlık olarak, her mekanın bir hikayesi olduğuna inanıyoruz. Tasarımlarımızda sadece estetiği değil, aynı zamanda fonksiyonelliği, sürdürülebilirliği ve kullanıcı deneyimini ön planda tutuyoruz. Mekanları, içinde yaşayanların ruhunu yansıtan, ilham veren ve huzur veren yaşam alanlarına dönüştürmeyi hedefliyoruz. Detaylara olan tutkumuz ve yenilikçi yaklaşımımızla, her projede beklentilerin ötesine geçmeyi amaçlıyoruz.
          </p>
          <Button asChild className="px-6 py-3 text-md rounded-full bg-primary hover:bg-primary/90 text-white shadow-md transition-all duration-300">
            <Link to="/about">Hakkımızda Daha Fazla <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <Separator className="my-12 bg-border/60" />

      {/* Testimonials Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Müşteri Yorumları</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Müşterilerimizin memnuniyeti, başarımızın en büyük göstergesidir. Onların deneyimlerinden ilham alıyoruz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="p-6 flex flex-col items-center text-center shadow-md rounded-xl bg-card hover:shadow-xl transition-shadow duration-300">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary"
              />
              <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-12 px-8 py-3 text-lg rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary/10 shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/testimonials">Tüm Referansları Görüntüle</Link>
        </Button>
      </section>

      {/* Call to Action - Contact */}
      <section className="bg-primary text-primary-foreground py-16 rounded-xl shadow-xl text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-4xl font-bold">Hayalinizdeki Mekanı Yaratmaya Hazır Mısınız?</h2>
          <p className="text-lg opacity-90">
            Projeniz hakkında konuşmak ve size özel bir teklif almak için bizimle iletişime geçin.
          </p>
          <Button asChild variant="secondary" className="px-8 py-3 text-lg rounded-full bg-white text-primary hover:bg-gray-100 shadow-lg transition-all duration-300 transform hover:scale-105">
            <Link to="/contact">Bize Ulaşın <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
