import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock BlogPost Type (will be replaced by Supabase types)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
}

const AdminBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
      if (error) {
        toast({
          title: 'Hata',
          description: 'Blog yazıları yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setBlogPosts(data as BlogPost[]);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Hata',
          description: 'Blog yazısı silinirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setBlogPosts(blogPosts.filter((post) => post.id !== id));
        toast({
          title: 'Başarılı',
          description: 'Blog yazısı başarıyla silindi.',
          variant: 'default',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Blog Yazıları Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Yönetimi</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Panele Dön
            </Button>
            <Button onClick={() => navigate('/admin/blog/new')} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni Yazı Ekle
            </Button>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mevcut Blog Yazıları</CardTitle>
          </CardHeader>
          <CardContent>
            {blogPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Henüz hiç blog yazısı eklenmemiş.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Yazar</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/blog/edit/${post.id}`)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBlogPage;
