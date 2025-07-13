import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock Service Type (will be replaced by Supabase types)
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  benefits: string[];
}

const AdminServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (error) {
        toast({
          title: 'Hata',
          description: 'Hizmetler yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setServices(data as Service[]);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) {
        toast({
          title: 'Hata',
          description: 'Hizmet silinirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else {
        setServices(services.filter((s) => s.id !== id));
        toast({
          title: 'Başarılı',
          description: 'Hizmet başarıyla silindi.',
          variant: 'default',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Hizmetler Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hizmet Yönetimi</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Panele Dön
            </Button>
            <Button onClick={() => navigate('/admin/services/new')} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni Hizmet Ekle
            </Button>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mevcut Hizmetler</CardTitle>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Henüz hiç hizmet eklenmemiş.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>İkon</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.description.substring(0, 70)}...</TableCell>
                      <TableCell>{service.icon}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/services/edit/${service.id}`)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
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

export default AdminServicesPage;
