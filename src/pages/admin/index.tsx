import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, LayoutGrid, Briefcase, Users, Rss, HelpCircle, Award, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        toast({
          title: 'Yetkisiz Erişim',
          description: 'Bu sayfaya erişmek için giriş yapmalısınız.',
          variant: 'destructive',
        });
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Çıkış Yapılamadı',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Başarıyla Çıkış Yapıldı',
        description: 'Giriş sayfasına yönlendiriliyorsunuz.',
        variant: 'default',
      });
      navigate('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Should be redirected by useEffect
  }

  const adminNavItems = [
    { name: 'Projeler', href: '/admin/projects', icon: LayoutGrid, description: 'Portföy projelerini yönetin' },
    { name: 'Hizmetler', href: '/admin/services', icon: Briefcase, description: 'Sunulan hizmetleri düzenleyin' },
    { name: 'Referanslar', href: '/admin/testimonials', icon: Users, description: 'Müşteri yorumlarını yönetin' },
    { name: 'Blog Yazıları', href: '/admin/blog', icon: Rss, description: 'Blog yazılarını ekleyin/düzenleyin' },
    { name: 'SSS', href: '/admin/faqs', icon: HelpCircle, description: 'Sıkça sorulan soruları güncelleyin' },
    { name: 'Ödüller', href: '/admin/awards', icon: Award, description: 'Kazanılan ödülleri ve basın haberlerini yönetin' },
    { name: 'Site Ayarları', href: '/admin/settings', icon: Settings, description: 'Genel site ayarlarını düzenleyin' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Yönetim Paneli</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Çıkış Yap
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminNavItems.map((item) => (
            <Card key={item.href} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-semibold">{item.name}</CardTitle>
                <item.icon className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Link to={item.href}>Yönet</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
