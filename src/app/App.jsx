import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProviderAX from "./providers/ThemeProvider.jsx";
import Shell from "../layout/Shell.jsx";
import Home from "../features/home/Home.jsx";
import Formations from "../features/formations/pages/Formations.jsx";
import Conseil from "../features/conseil/pages/Conseil.jsx";
import TMS from "../features/tms/pages/TMS.jsx";
import Blog from "../features/blog/pages/Blog.jsx";
import Article from "../features/blog/pages/Article.jsx";
import Contact from "../features/contact/pages/Contact.jsx";
import NotFound from "./routes/NotFound.jsx";

export default function App() {
  return (
    <ThemeProviderAX>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/conseil" element={<Conseil />} />
            <Route path="/tms" element={<TMS />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProviderAX>
  );
}
