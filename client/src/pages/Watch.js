import Header from "../components/Header";
import MovieWatch from "../components/MovieWatch";
import Template from "../components/Template";

const Watch = () => {
    return (
       <Template header={<Header/>} children={<MovieWatch/>}/>
    );
}
 
export default Watch;