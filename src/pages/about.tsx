import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Award, Users, Lightbulb, ArrowRight } from 'lucide-react';

// Mock Data Import
import { teamMembers } from '@/data/team';
import { awards } from '@/data/awards';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Hakkımızda</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Bladon Mimarlık, iç mekan tasarımında estetik, fonksiyonellik ve sürdürülebilirliği bir araya getiren yenilikçi bir stüdyodur.
      </p>

      {/* Company Story / Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Bladon Mimarlık Ofisi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-3xl font-bold drop-shadow-md">Hikayemiz</h3>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Vizyonumuz ve Felsefemiz</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Bladon Mimarlık, 2015 yılında iç mekanlara yeni bir soluk getirme vizyonuyla kuruldu. Kurulduğumuz günden bu yana, her projede müşteri memnuniyetini ve özgünlüğü ön planda tutarak, yaşam alanlarını sadece estetik değil, aynı zamanda işlevsel ve sürdürülebilir kılmayı hedefledik. Tasarım felsefemiz, mekanın ruhunu anlamak ve bu ruha uygun, kişiye özel çözümler üretmektir. Her detayda kaliteyi ve zanaatkarlığı arayarak, zamansız ve ilham veren mekanlar yaratıyoruz.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ekibimiz, farklı disiplinlerden gelen deneyimli mimar ve tasarımcılardan oluşmaktadır. Birlikte çalışarak, her projenin potansiyelini en üst düzeye çıkarıyor ve müşterilerimizin beklentilerini aşan sonuçlar elde ediyoruz.
          </p>
        </div>
      </section>

      <Separator className="my-12 bg-border/60" />

      {/* Team Members */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Ekibimiz</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Bladon Mimarlık'ın arkasındaki yaratıcı zihinler ve deneyimli profesyoneller.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-primary"
              />
              <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm mb-2">{member.title}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12 bg-border/60" />

      {/* Awards & Certifications */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Ödüller ve Basında Biz</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Başarılarımız ve sektördeki tanınırlığımız.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => (
            <Card key={award.id} className="p-6 flex flex-col items-center text-center shadow-md rounded-xl bg-card hover:shadow-xl transition-shadow duration-300">
              <Award className="h-12 w-12 text-light-bronze mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">{award.title}</CardTitle>
              <CardContent className="text-muted-foreground text-sm">
                <p>{award.description}</p>
                {award.link && (
                  <a href={award.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-2 block">
                    Daha Fazla Oku
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action - Contact */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Bize Katılın veya İletişime Geçin</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Ekibimizle tanışmak veya bir sonraki projenizi konuşmak için bizimle iletişime geçmekten çekinmeyin.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/contact">İletişim Formu</Link>
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;
