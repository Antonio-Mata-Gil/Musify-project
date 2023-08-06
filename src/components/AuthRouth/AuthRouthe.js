
import { Navigate } from 'react-router-dom';

function AuthRouthe({token, component}) {
    if (token) return component;
    if (!token) return <Navigate to="/Login" />
}

export default AuthRouthe
