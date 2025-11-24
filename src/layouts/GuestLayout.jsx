import Navbar from '../components/guest/Navbar.jsx';
import Footer from '../components/guest/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function GuestLayout() {
    return (
      <div className="font-inter">
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
  