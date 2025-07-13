import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock SiteSettings Type (will be replaced by Supabase types)
interface SiteSettings {
  id: string;
  companyName: string;
  tagline: string;
  aboutSummary: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagramUrl: string;
  linkedinUrl: string;
  pinterestUrl: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  ctaHomepageText: string;
  ctaHomepageLink: string;
}

const settingsSchema = z.object({
  companyName: z.string().min(1, 'Şirket adı gerekli.'),
  tagline: z.string().min(1, 'Slogan gerekli.'),
  aboutSummary: z.string().min(1, 'Hakkımızda özeti gerekli.'),
  contactEmail: z.string().email('Geçerli bir e-posta girin.'),
  contactPhone: z.string().min(1, 'Telefon numarası gerekli.'),
  address: z.string().min(1, 'Adres gerekli.'),
  instagramUrl: z.string().url('Geçerli bir URL girin.').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Geçerli bir URL girin.').optional().or(z.literal('')),
  pinterestUrl: z.string().url('Geçerli bir URL girin.').optional().or(z.literal('')),
  seoMetaTitle: z.string().min(1, 'SEO Meta Başlığı gerekli.'),
  seoMetaDescription: z.string().min(1, 'SEO Meta Açıklaması gerekli.'),
  ctaHomepageText: z.string().min(1, 'Anasayfa CTA metni gerekli.'),
  ctaHomepageLink: z.string().url('Geçerli bir URL girin.'),
});

const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: '',
      tagline: '',
      aboutSummary: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      instagramUrl: '',
      linkedinUrl: '',
      pinterestUrl: '',
      seoMetaTitle: '',
      seoMetaDescription: '',
      ctaHomepageText: '',
      ctaHomepageLink: '',
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        toast({
          title: 'Hata',
          description: 'Site ayarları yüklenirken bir hata oluştu: ' + error.message,
          variant: 'destructive',
        });
      } else if (data) {
        form.reset(data);
      }
      setLoading(false);
    };

    fetchSettings();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    setLoading(true);
    const { data: existingSettings, error: fetchError } = await supabase.from('site_settings').select('id').single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      toast({
        title: 'Hata',
        description: 'Ayarlar kontrol edilirken bir hata oluştu: ' + fetchError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    let upsertError = null;
    if (existingSettings) {
      // Update existing settings
      const { error } = await supabase.from('site_settings').update(values).eq('id', existingSettings.id);
      upsertError = error;
    } else {
      // Insert new settings
      const { error } = await supabase.from('site_settings').insert(values);
      upsertError = error;
    }

    if (upsertError) {
      toast({
        title: 'Hata',
        description: 'Ayarlar kaydedilirken bir hata oluştu: ' + upsertError.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Başarılı',
        description: 'Site ayarları başarıyla güncellendi.',
        variant: 'default',
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground text-lg">Ayarlar Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Site Ayarları</h1>
          <Button onClick={() => navigate('/admin')} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Panele Dön
          </Button>
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Genel Site Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şirket Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Bladon Mimarlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slogan</FormLabel>
                      <FormControl>
                        <Input placeholder="Mekanlara Ruh Katıyoruz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aboutSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hakkımızda Kısa Özet (Anasayfa)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Estetik ve fonksiyonelliği bir araya getirerek..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-xl font-semibold mt-8 mb-4">İletişim Bilgileri</h3>
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta Adresi</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@bladonmimarlik.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon Numarası</FormLabel>
                      <FormControl>
                        <Input placeholder="+90 555 123 45 67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Örnek Mah. Örnek Cad. No: 123..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-xl font-semibold mt-8 mb-4">Sosyal Medya Linkleri</h3>
                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/bladonmimarlik" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/company/bladonmimarlik" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pinterestUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pinterest URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://pinterest.com/bladonmimarlik" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-xl font-semibold mt-8 mb-4">SEO Ayarları</h3>
                <FormField
                  control={form.control}
                  name="seoMetaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Başlık</FormLabel>
                      <FormControl>
                        <Input placeholder="Bladon Mimarlık | İç Mimarlık ve Tasarım Stüdyosu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoMetaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Açıklama</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bladon Mimarlık, modern ve minimalist iç mekan tasarımları sunar..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-xl font-semibold mt-8 mb-4">CTA Ayarları (Anasayfa)</h3>
                <FormField
                  control={form.control}
                  name="ctaHomepageText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anasayfa CTA Metni</FormLabel>
                      <FormControl>
                        <Input placeholder="Proje Teklifi Alın" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctaHomepageLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anasayfa CTA Linki</FormLabel>
                      <FormControl>
                        <Input placeholder="/contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg rounded-lg shadow-md transition-all duration-300">
                  <Save className="mr-2 h-5 w-5" /> Ayarları Kaydet
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
