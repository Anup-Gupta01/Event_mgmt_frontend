import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Venues from './pages/Venues/Venues';
import VenueDetail from './pages/Venues/VenueDetail';
import Events from './pages/Events/Events';
import Gallery from './pages/Gallery/Gallery';
import Packages from './pages/Packages/Packages';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/venues"     element={<Venues />} />
          <Route path="/venues/:slug" element={<VenueDetail />} />
          <Route path="/events"     element={<Events />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/packages"   element={<Packages />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/admin/*"    element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
