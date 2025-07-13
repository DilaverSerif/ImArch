import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock FAQ Type (will be replaced by Supabase types)
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const AdminFaqsPage: React.FC = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
      if (error) {
        toast({
          title: 'Hata',
          description: 'SSS yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setFaqs(data as FAQ[]);
      }
      setLoading(false);
    };

    fetchFaqs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu SSS öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Hata',
          description: 'SSS öğesi silinirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setFaqs(faqs.filter((faq) => faq.id !== id));
        toast({
          title: 'Başarılı',
          description: 'SSS öğesi başarıyla silindi.',
          variant: 'default',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">SSS Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">SSS Yönetimi</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Panele Dön
            </Button>
            <Button onClick={() => navigate('/admin/faqs/new')} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni SSS Ekle
            </Button>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mevcut Sıkça Sorulan Sorular</CardTitle>
          </CardHeader>
          <CardContent>
            {faqs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Henüz hiç SSS eklenmemiş.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Soru</TableHead>
                    <TableHead>Cevap</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium">{faq.question}</TableCell>
                      <TableCell>{faq.answer.substring(0, 70)}...</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/faqs/edit/${faq.id}`)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>
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

export default AdminFaqsPage;
