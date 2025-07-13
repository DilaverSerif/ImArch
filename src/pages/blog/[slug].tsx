import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock Data Import
import { blogPosts } from '@/data/blog';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-destructive mb-4">Yazı Bulunamadı</h1>
        <p className="text-lg text-muted-foreground mb-8">Aradığınız blog yazısı mevcut değil veya silinmiş olabilir.</p>
        <Button asChild>
          <Link to="/blog">Bloga Geri Dön</Link>
        </Button>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
        break;
      case 'pinterest':
        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareTitle)}&media=${encodeURIComponent(post.imageUrl)}`;
        break;
      case 'twitter': // Now X
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-12">
      <Button asChild variant="outline" className="mb-8">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tüm Yazılar
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
        />
        <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
        <div className="flex items-center text-muted-foreground text-sm mb-6 space-x-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Paylaş
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleShare('linkedin')}>LinkedIn</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('pinterest')}>Pinterest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')}>X (Twitter)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('facebook')}>Facebook</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          {/* This is where the rich text content would go. For mock data, it's a simple paragraph. */}
          <p>{post.content}</p>
          {/* Example of more detailed content structure */}
          {/*
          <h3>Alt Başlık 1</h3>
          <p>Bu paragraf, blog yazısının bir bölümünü temsil eder. İç mimarlık trendleri, malzeme seçimleri veya proje hikayeleri gibi konulara değinebilir.</p>
          <ul>
            <li>Madde 1: Detaylı bilgi</li>
            <li>Madde 2: İpuçları</li>
            <li>Madde 3: Örnekler</li>
          </ul>
          <h4>Alt Başlık 2</h4>
          <p>Görsel destekli içerikler için buraya ek görseller veya videolar eklenebilir.</p>
          <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Blog görseli" className="rounded-lg my-6" />
          <p>Sonuç olarak, okuyuculara değerli bilgiler sunmayı hedefliyoruz.</p>
          */}
        </div>
      </article>

      <Separator className="my-12 bg-border/60" />

      {/* Call to Action - Contact */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Sorularınız mı Var?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          İç mimarlık projeleriniz veya blog yazılarımız hakkında daha fazla bilgi almak için bize ulaşın.
        </p>
        <Button asChild className="px-8 py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link to="/contact">Bize Yazın</Link>
        </Button>
      </section>
    </div>
  );
};

export default BlogPostPage;
