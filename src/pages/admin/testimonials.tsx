import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock Testimonial Type (will be replaced by Supabase types)
interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

const AdminTestimonialsPage: React.FC = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) {
        toast({
          title: 'Hata',
          description: 'Referanslar yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setTestimonials(data as Testimonial[]);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu referansı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Hata',
          description: 'Referans silinirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        toast({
          title: 'Başarılı',
          description: 'Referans başarıyla silindi.',
          variant: 'default',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Referanslar Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Referans Yönetimi</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Panele Dön
            </Button>
            <Button onClick={() => navigate('/admin/testimonials/new')} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni Referans Ekle
            </Button>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mevcut Referanslar</CardTitle>
          </CardHeader>
          <CardContent>
            {testimonials.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Henüz hiç referans eklenmemiş.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adı</TableHead>
                    <TableHead>Unvanı</TableHead>
                    <TableHead>Yorum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">{testimonial.name}</TableCell>
                      <TableCell>{testimonial.title}</TableCell>
                      <TableCell>{testimonial.quote.substring(0, 70)}...</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/testimonials/edit/${testimonial.id}`)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
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

export default AdminTestimonialsPage;
