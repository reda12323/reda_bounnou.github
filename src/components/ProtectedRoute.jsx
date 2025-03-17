import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { isSignedIn, isLoaded } = useAuth();
    const location = useLocation();

    if (!isLoaded) {
        // Return a loading state or null while authentication status is being checked
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        
        return <Navigate to={`/signin?redirectUrl=${location.pathname}`} replace />;
    }
    return children;
}

export default ProtectedRoute;
