import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock Data Import
import { blogPosts } from '@/data/blog';

const BlogPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">Blog ve İpuçları</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        İç mimarlık dünyasındaki en son trendler, tasarım ipuçları ve proje süreçlerimiz hakkında yazılarımızı keşfedin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
            />
            <CardHeader className="text-left">
              <CardTitle className="text-2xl font-semibold">{post.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{post.date} | {post.author}</p>
            </CardHeader>
            <CardContent className="text-left pb-6">
              <p className="text-muted-foreground text-sm mb-4">{post.content.substring(0, 150)}...</p>
              <Button asChild variant="link" className="text-primary hover:text-primary/80">
                <Link to={`/blog/${post.slug}`}>Devamını Oku <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
