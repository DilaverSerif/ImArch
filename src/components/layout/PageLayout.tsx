import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-screen-xl px-4 md:px-8 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
