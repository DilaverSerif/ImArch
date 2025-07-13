import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin, Award } from 'lucide-react'; // Pinterest kaldırıldı
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground py-12 mt-20 border-t border-border/40">
      <div className="container max-w-screen-xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <Award className="h-8 w-8 text-light-bronze" />
            <span className="font-bold text-2xl text-foreground">Bladon Mimarlık</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            İç mekanlara ruh katan tasarımlarımızla, hayallerinizi gerçeğe dönüştürüyoruz. Estetik ve fonksiyonelliği bir araya getirerek yaşam alanlarınızı yeniden tanımlıyoruz.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Hızlı Bağlantılar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portföy</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Hizmetler</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">İletişim</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">İletişim</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@bladonmimarlik.com" className="hover:text-primary transition-colors">info@bladonmimarlik.com</a>
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+905551234567" className="hover:text-primary transition-colors">+90 555 123 45 67</a>
            </p>
            <p className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <span>Örnek Mah. Örnek Cad. No: 123, Kat: 4, Daire: 5, İstanbul, Türkiye</span>
            </p>
          </div>
          <div className="flex space-x-4 mt-6">
            <a href="https://instagram.com/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            {/* Pinterest ikonu kaldırıldı */}
            {/* <a href="https://pinterest.com/bladonmimarlik" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Pinterest className="h-6 w-6" />
            </a> */}
          </div>
        </div>
      </div>
      <Separator className="my-8 bg-border/60" />
      <div className="container max-w-screen-xl px-4 md:px-8 text-center text-xs text-muted-foreground">
        © {currentYear} Bladon Mimarlık. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
