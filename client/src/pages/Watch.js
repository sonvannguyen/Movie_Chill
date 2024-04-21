import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header";
import MovieWatch from "../components/MovieWatch";
import Template from "../components/Template";
import movieApi from "../services/movieApi";
import userApi from "../services/userApi";

const Watch = () => {
    const {movieSlug} = useParams()
    const userId = localStorage.getItem('movie_userId')
   
    // get movie data detail by slug
    const {data: movieData, refetch: refetchMovieDetail} = useQuery(
        ['movieDetail', movieSlug],
        () => movieApi.getMovieDetail(movieSlug),
        {
            staleTime: 5 * 60 * 1000
        }
    )

    // handle add movie to history
    const addMovieToHistory = useMutation(
        userApi.addMovieToHistory,
        {
            onError: (error) => alert(error)
        }
    )
    useEffect(() => {
        if(movieData && userId){
            addMovieToHistory.mutate({userId, movieId: movieData._id})
        }
    }, [movieData])

    // handle create comment movie
    const createComment = useMutation(
        userApi.createNewComment,
        {
            onSuccess: () => {
                refetchMovieDetail()
            },
            onError: (error) => alert(error)
        }
    )

    const handleOnSubmitCreateComment = (content) => {
        createComment.mutate({userId, movieId: movieData._id, content})
    }
    return (
       <Template 
        header={<Header/>} 
        children={
            <MovieWatch 
                movieData={movieData} 
                episodes={movieData?.episodes}
                handleOnSubmitCreateComment={handleOnSubmitCreateComment}
                refetchMovieDetail={refetchMovieDetail}
            />
        }
       />
    );
}
 
export default Watch;