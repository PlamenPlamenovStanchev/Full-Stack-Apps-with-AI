import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">AutoMarket</Link>
        <div className="space-x-4">
          <Link to="/listings" className="text-gray-600 hover:text-blue-600">Browse</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              <button onClick={signOut} className="text-gray-600 hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 justify-center text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
