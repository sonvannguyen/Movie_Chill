import { useEffect, useState } from "react";
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
    const [filterMovieRecommend, setFilterMovieRecommend ] = useState({
        type: '',
        category: '',
        country: ''
    })
    
    useEffect(() => {
        setFilterMovieRecommend({
            type: movieData?.movie.type,
            category: movieData?.movie.category[0].name,
            country: movieData?.movie.country[0].name
        })
    }, [movieData])

    const {data: movieRecommnedData, refetch} = useQuery(
        ['movieRecommned', movieSlug],
        () => movieApi.getMovieRecommend(filterMovieRecommend),
        {
            staleTime: 5 * 60 * 1000,
            enabled: false
        }
    )
    useEffect(()=> {
        if(Object.values(filterMovieRecommend).every(field => field !== '')){
            refetch()
        }
    }, [filterMovieRecommend])
   
    return (
       <Template 
        header={<Header/>} 
        children={<MovieWatch movieData={movieData} episode={episode} movieRecommnedData={movieRecommnedData}/>}
       />
    );
}
 
export default Watch;