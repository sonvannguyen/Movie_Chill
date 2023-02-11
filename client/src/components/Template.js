import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarSuggestions from "./SidebarSuggestions";

const Template = ({header, children}) => {
    const userId = localStorage.getItem('movie_userId')
  
    return ( 
        <div className="grid grid-cols-5 gap-6">
            <div className="col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="col-start-2 col-span-3 overflow-y-scroll no-scrollbar h-screen">
                {header}
                {children}
                <Footer/>
            </div>
            <div className="col-span-1">
                <SidebarSuggestions/>
            </div>
        </div>
    );
}
 
export default Template;