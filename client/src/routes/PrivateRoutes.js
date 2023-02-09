import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('movie_access_token')
    
    return token ? <Outlet /> : <Navigate to='/login' />
}
 
export default PrivateRoutes;