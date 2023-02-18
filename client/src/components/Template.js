import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarSuggestions from "./SidebarSuggestions";

const Template = ({header, children}) => {
  
    return ( 
        <div className="md:grid lg:grid-cols-5 lg:gap-6 md:grid-cols-4">
            <div className="hidden bg:block md:block col-start-1 col-end-2 h-screen">
                <Sidebar/>
            </div>
            <div className="md:col-start-2 md:col-span-3 md:overflow-y-scroll md:no-scrollbar h-screen">
                {header}
                {children}
                <Footer/>
            </div>
            <div className="hidden lg:block lg:col-span-1">
                <SidebarSuggestions/>
            </div>

        </div>
    );
}
 
export default Template;