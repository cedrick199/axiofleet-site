// src/app/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../features/home/pages/Home.jsx";
import Formations from "../features/formations/pages/Formations.jsx";
import Conseil from "../features/conseil/pages/Conseil.jsx";
import Tms from "../features/tms/pages/Tms.jsx"; // ✅ Import PascalCase correct
import Blog from "../features/blog/pages/Blog.jsx";
import Contact from "../features/contact/pages/Contact.jsx";
import Presentation from "../features/presentation/pages/Presentation.jsx";
import NotFound from "../features/common/pages/NotFound.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/conseil" element={<Conseil />} />
        <Route path="/tms" element={<Tms />} /> {/* ✅ Utilisation correcte */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
