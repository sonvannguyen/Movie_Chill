import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('token-user')
    
    return token ? <Outlet /> : <Navigate to='/login' />
}
 
export default PrivateRoutes;