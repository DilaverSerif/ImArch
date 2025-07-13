import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Calendar, Palette, Box } from 'lucide-react';

// Mock Data Import
import { projects } from '@/data/projects';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-destructive mb-4">Proje Bulunamadı</h1>
        <p className="text-lg text-muted-foreground mb-8">Aradığınız proje mevcut değil veya silinmiş olabilir.</p>
        <Button asChild>
          <Link to="/portfolio">Portföye Geri Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Button asChild variant="outline" className="mb-8">
        <Link to="/portfolio">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tüm Projeler
        </Link>
      </Button>

      <h1 className="text-5xl font-bold text-foreground text-center mb-8">{project.title}</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
        {project.description}
      </p>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {project.location && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Konum: {project.location}</span>
          </div>
        )}
        {project.completionDate && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Tamamlanma Tarihi: {project.completionDate}</span>
          </div>
        )}
        {project.colorPalette && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Palette className="h-5 w-5 text-primary" />
            <span>Renk Paleti: {project.colorPalette}</span>
          </div>
        )}
        {project.materials && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Box className="h-5 w-5 text-primary" />
            <span>Kullanılan Malzemeler: {project.materials}</span>
          </div>
        )}
      </div>

      {/* Project Story */}
      {project.story && (
        <section className="bg-card p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Proje Hikayesi</h2>
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.story}
          </p>
        </section>
      )}

      {/* High-Resolution Visuals */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground text-center">Görseller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-lg group">
              <img
                src={image}
                alt={`${project.title} - Görsel ${index + 1}`}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-lg font-semibold">{project.title} - Detay {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Support */}
      {project.videoUrl && (
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Proje Videosu</h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={project.videoUrl}
              title={`${project.title} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </section>
      )}

      <Separator className="my-12 bg-border/60" />

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Benzer Bir Proje Mi İstiyorsunuz?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Hayalinizdeki mekanı gerçeğe dönüştürmek için bizimle iletişime geçin.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/contact">Ücretsiz Teklif Alın</Link>
        </Button>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
