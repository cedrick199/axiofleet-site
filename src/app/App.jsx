import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './providers/ThemeProvider.jsx';

import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';

// PAGES (lazy-loaded)
const Home = lazy(() => import('../features/home/Home.jsx'));
const Formations = lazy(() => import('../features/formations/pages/Formations.jsx'));
const Conseil = lazy(() => import('../features/conseil/pages/Conseil.jsx'));
const TmsPage = lazy(() => import('../features/tms/pages/TMS.jsx'));
const Blog = lazy(() => import('../features/blog/pages/Blog.jsx'));
const Contact = lazy(() => import('../features/contact/pages/Contact.jsx'));
const Presentation = lazy(() => import('../features/presentation/pages/Presentation.jsx'));
const NotFound = lazy(() => import('../routes/NotFound.jsx'));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accueil" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/conseil" element={<Conseil />} />
            <Route path="/tms" element={<TmsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
