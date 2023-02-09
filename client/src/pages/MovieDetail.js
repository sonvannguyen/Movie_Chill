import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieInfor from "../components/MovieInfor";
import Template from "../components/Template";
import movieApi from "../services/movieApi";

const MovieDetail = () => {
  const {movieSlug} = useParams()
  const {data: movieDetailData, isLoading} = useQuery(
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
          type: movieDetailData?.movie.type,
          category: movieDetailData?.movie.category[0].name,
          country: movieDetailData?.movie.country[0].name
      })
  }, [movieDetailData])

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
      children={
        <MovieInfor movieDetailData={movieDetailData?.movie}  isLoading={isLoading} movieRecommnedData ={movieRecommnedData}/>
      }
    />
  );
};

export default MovieDetail;
