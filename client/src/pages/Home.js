import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Template from "../components/Template";

const Home = () => {
  return (
    <Template children={<MovieList/>} header={<Header/>}/>
  );
};

export default Home;
