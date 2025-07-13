import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock Data Import
import { projects } from '@/data/projects';

const PortfolioPage: React.FC = () => {
  // Optional: Project categorization can be implemented here if needed
  // const categories = [...new Set(projects.map(p => p.category))];
  // const [selectedCategory, setSelectedCategory] = React.useState('Tümü');

  // const filteredProjects = selectedCategory === 'Tümü'
  //   ? projects
  //   : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Portföyümüz</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Bladon Mimarlık olarak tamamladığımız projelerden seçkiler. Her proje, estetik ve fonksiyonelliği bir araya getiren özgün bir hikaye anlatır.
      </p>

      {/* Optional Category Filter */}
      {/*
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={selectedCategory === 'Tümü' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('Tümü')}
        >
          Tümü
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-60 object-cover transition-transform duration-500 hover:scale-105"
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
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
