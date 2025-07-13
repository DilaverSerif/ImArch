import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutGrid, Briefcase, Info, Mail, Rss, HelpCircle, Workflow, Users, Award, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: 'Anasayfa', href: '/', icon: Home },
    { name: 'Portföy', href: '/portfolio', icon: LayoutGrid },
    { name: 'Hizmetler', href: '/services', icon: Briefcase },
    { name: 'Hakkımızda', href: '/about', icon: Info },
    { name: 'Çalışma Süreci', href: '/process', icon: Workflow },
    { name: 'Referanslar', href: '/testimonials', icon: Users },
    { name: 'Blog', href: '/blog', icon: Rss },
    { name: 'SSS', href: '/faq', icon: HelpCircle },
    { name: 'İletişim', href: '/contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Award className="h-6 w-6 text-light-bronze" />
          <span className="font-bold text-xl text-foreground">Bladon Mimarlık</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link to={item.href} className={cn(navigationMenuTriggerStyle(), "text-sm font-medium")}>
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/admin/login"
                  className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors mt-4"
                >
                  <Mail className="h-5 w-5" />
                  Admin Girişi
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
