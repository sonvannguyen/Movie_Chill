import {Link} from 'react-router-dom'

const NotFound = () => {
    return ( 
        <div class="flex flex-col h-screen justify-center items-center">
            <h1 class="text-9xl font-bold text-white mb-8">404</h1>
            <h2 class="text-2xl font-medium text-white mb-4">Oops! Page not found.</h2>
            <p class="text-lg text-white opacity-80 text-center">Sorry, but the page you were looking for could not be found.</p>
            <Link to="/" class="mt-8 bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors duration-300">Go back to home</Link>
        </div>
     );
}
 
export default NotFound;