import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import PageLayout from '@/components/layout/PageLayout';

// Import pages
import HomePage from './index';
import PortfolioPage from './portfolio/index';
import ProjectDetailPage from './portfolio/[slug]';
import ServicesPage from './services';
import AboutPage from './about';
import ContactPage from './contact';
import BlogPage from './blog/index';
import BlogPostPage from './blog/[slug]';
import FAQPage from './faq';
import ProcessPage from './process';
import TestimonialsPage from './testimonials';
import AdminLoginPage from './admin/login';
import AdminDashboardPage from './admin/index';
import AdminProjectsPage from './admin/projects';
import AdminServicesPage from './admin/services';
import AdminTestimonialsPage from './admin/testimonials';
import AdminBlogPage from './admin/blog';
import AdminFaqsPage from './admin/faqs';
import AdminAwardsPage from './admin/awards';
import AdminSettingsPage from './admin/settings';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/portfolio" element={<PageLayout><PortfolioPage /></PageLayout>} />
          <Route path="/portfolio/:slug" element={<PageLayout><ProjectDetailPage /></PageLayout>} />
          <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
          <Route path="/blog/:slug" element={<PageLayout><BlogPostPage /></PageLayout>} />
          <Route path="/faq" element={<PageLayout><FAQPage /></PageLayout>} />
          <Route path="/process" element={<PageLayout><ProcessPage /></PageLayout>} />
          <Route path="/testimonials" element={<PageLayout><TestimonialsPage /></PageLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} /> {/* Placeholder for now */}
          <Route path="/admin/projects" element={<AdminProjectsPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/faqs" element={<AdminFaqsPage />} />
          <Route path="/admin/awards" element={<AdminAwardsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
