import { Route, Routes } from "react-router-dom";
import Bookmarked from "../pages/Bookmarked";
import FilterMovie from "../pages/FilterMovie";
import History from "../pages/History";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import NotFound from "../pages/NotFound";
import SearchMovie from "../pages/SearchMovie";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Watch from "../pages/Watch";
import PrivateRoutes from "./PrivateRoutes";

const RoutesApp = () => {
    return ( 
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="history" element={<History/>}/>
                <Route path="bookmarked" element={<Bookmarked/>}/>
            </Route>

            <Route path="filter" element={<FilterMovie/>}/>
            <Route path="search" element={<SearchMovie/>}/>

            <Route path="login" element={<SignIn/>}/>
            <Route path="register" element={<SignUp/>}/>

            <Route path="detail/:movieSlug" element={<MovieDetail/>}/>
            <Route path="watch/:movieSlug/episode/:episode" element={<Watch/>}/>
            
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>

        </Routes>
     );
}
 
export default RoutesApp;