import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock Award Type (will be replaced by Supabase types)
interface AwardItem {
  id: string;
  title: string;
  description: string;
  year: number;
  link?: string;
  imageUrl?: string;
}

const AdminAwardsPage: React.FC = () => {
  const navigate = useNavigate();
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      const { data, error } = await supabase.from('awards').select('*').order('year', { ascending: false });
      if (error) {
        toast({
          title: 'Hata',
          description: 'Ödüller yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setAwards(data as AwardItem[]);
      }
      setLoading(false);
    };

    fetchAwards();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu ödülü/basın haberini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      const { error } = await supabase.from('awards').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Hata',
          description: 'Ödül/basın haberi silinirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setAwards(awards.filter((award) => award.id !== id));
        toast({
          title: 'Başarılı',
          description: 'Ödül/basın haberi başarıyla silindi.',
          variant: 'default',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Ödüller Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ödül ve Basın Yönetimi</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Panele Dön
            </Button>
            <Button onClick={() => navigate('/admin/awards/new')} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni Ödül/Haber Ekle
            </Button>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mevcut Ödüller ve Basın Haberleri</CardTitle>
          </CardHeader>
          <CardContent>
            {awards.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Henüz hiç ödül veya basın haberi eklenmemiş.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Yıl</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {awards.map((award) => (
                    <TableRow key={award.id}>
                      <TableCell className="font-medium">{award.title}</TableCell>
                      <TableCell>{award.year}</TableCell>
                      <TableCell>{award.description.substring(0, 70)}...</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/awards/edit/${award.id}`)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(award.id)}>
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

export default AdminAwardsPage;
