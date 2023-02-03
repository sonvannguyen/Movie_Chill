import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import MovieWatch from "../components/MovieWatch";
import Template from "../components/Template";
import movieApi from "../services/movieApi";

const Watch = () => {
    const {movieSlug, episode} = useParams()
    const {data: movieData} = useQuery(
        ['movieDetail', movieSlug],
        () => movieApi.getMovieDetail(movieSlug),
        {
        staleTime: 5 * 60 * 1000
        }
    )
    return (
       <Template header={<Header/>} children={<MovieWatch movieData={movieData} episode={episode}/>}/>
    );
}
 
export default Watch;