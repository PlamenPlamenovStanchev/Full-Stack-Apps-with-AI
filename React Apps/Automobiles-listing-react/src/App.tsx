import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import BrowseListings from './pages/BrowseListings';
import ListingDetails from './pages/ListingDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import CreateListing from './pages/dashboard/CreateListing';
import EditListing from './pages/dashboard/EditListing';
import DeleteListing from './pages/dashboard/DeleteListing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<BrowseListings />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/publish" element={<CreateListing />} />
                <Route path="/dashboard/edit/:id" element={<EditListing />} />
                <Route path="/dashboard/delete/:id" element={<DeleteListing />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


