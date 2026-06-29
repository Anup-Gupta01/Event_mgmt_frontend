import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Venues from './pages/Venues/Venues';
import VenueDetail from './pages/Venues/VenueDetail';
import Events from './pages/Events/Events';
import Gallery from './pages/Gallery/Gallery';
import Packages from './pages/Packages/Packages';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import MyBookings from './pages/Login/MyBookings';
import Booking from './pages/Booking/Booking';
import TrackBooking from './pages/Track/TrackBooking';

// Admin pages
import AdminLogin    from './pages/Admin/AdminLogin';
import AdminSignup   from './pages/Admin/AdminSignup';
import AdminLayout   from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminBookings  from './pages/Admin/AdminBookings';
import AdminServices  from './pages/Admin/AdminServices';
import AdminPackages  from './pages/Admin/AdminPackages';
import AdminCalendar  from './pages/Admin/AdminCalendar';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin      = location.pathname.startsWith('/admin');
  const isLogin      = location.pathname === '/login';
  const isMyBookings = location.pathname === '/my-bookings';

  return (
    <>
      <ScrollToTop />
      {!isAdmin && !isMyBookings && <Navbar />}
      <main>
        <Routes>
          {/* ── Public routes ── */}
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/venues"       element={<Venues />} />
          <Route path="/venues/:slug" element={<VenueDetail />} />
          <Route path="/events"       element={<Events />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/packages"     element={<Packages />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/booking"      element={<Booking />} />
          <Route path="/track"        element={<TrackBooking />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/my-bookings"  element={<MyBookings />} />

          {/* ── Admin routes ── */}
          <Route path="/admin/login"   element={<AdminLogin />} />
          <Route path="/admin/signup"  element={<AdminSignup />} />
          <Route path="/admin"         element={<AdminLayout />}>
            <Route index               element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="bookings"     element={<AdminBookings />} />
            <Route path="services"     element={<AdminServices />} />
            <Route path="packages"     element={<AdminPackages />} />
            <Route path="calendar"     element={<AdminCalendar />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && !isLogin && !isMyBookings && <Footer />}
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
