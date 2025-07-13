import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MapPin, Instagram, Linkedin, Pinterest } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Adınız en az 2 karakter olmalı.' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi girin.' }),
  subject: z.string().min(5, { message: 'Konu en az 5 karakter olmalı.' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalı.' }),
});

const ContactPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate form submission
    console.log(values);
    toast({
      title: 'Mesajınız Gönderildi!',
      description: 'En kısa sürede sizinle iletişime geçeceğiz.',
      variant: 'default',
    });
    form.reset();
  }

  return (
    <div className="space-y-16">
      <h1 className="text-5xl font-bold text-center text-foreground mb-4">İletişim</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Hayalinizdeki mekanı tasarlamak için bizimle iletişime geçin. Sorularınızı yanıtlamaktan ve projelerinizi konuşmaktan mutluluk duyarız.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-card p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Bize Ulaşın</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">E-posta</p>
                <a href="mailto:info@bladonmimarlik.com" className="hover:text-primary transition-colors">info@bladonmimarlik.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Telefon</p>
                <a href="tel:+905551234567" className="hover:text-primary transition-colors">+90 555 123 45 67</a>
              </div>
            </div>
            <div className="flex items-start gap-4 text-muted-foreground">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Adres</p>
                <p>Örnek Mah. Örnek Cad. No: 123, Kat: 4, Daire: 5, İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Sosyal Medya</h3>
            <div className="flex space-x-6">
              <a href="https://instagram.com/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="https://linkedin.com/company/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-7 w-7" />
              </a>
              <a href="https://pinterest.com/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Pinterest className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-6">Mesaj Gönderin</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adınız Soyadınız</FormLabel>
                    <FormControl>
                      <Input placeholder="Adınız Soyadınız" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta Adresiniz</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konu</FormLabel>
                    <FormControl>
                      <Input placeholder="Proje Teklifi, İşbirliği vb." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesajınız</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mesajınızı buraya yazın..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg rounded-lg shadow-md transition-all duration-300">
                Mesajı Gönder
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Map Section (Optional) */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-6">Konumumuz</h2>
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.8900000000003!2d28.9783589156591!3d41.0082379792998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac24e00000000%3A0x0!2zNDHCsDAwJzI5LjciTiAyOMKwNTgnNDIuMSJF!5e0!3m2!1str!2str!4v1678912345678!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
