import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './providers/ThemeProvider.jsx';

import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';

// PAGES
import Home from '../features/home/Home.jsx'; // <-- chemin corrigé (pas /pages/)
import Formations from '../features/formations/pages/Formations.jsx';
import Conseil from '../features/conseil/pages/Conseil.jsx';
import TMS from '../features/tms/pages/TMS.jsx';
import Blog from '../features/blog/pages/Blog.jsx';
import Contact from '../features/contact/pages/Contact.jsx';
import Presentation from '../features/presentation/pages/Presentation.jsx';
import NotFound from '../routes/NotFound.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/conseil" element={<Conseil />} />
          <Route path="/tms" element={<TMS />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
