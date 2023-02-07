import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

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
  return (
    <Template children={<MovieInfor movieDetailData={movieDetailData?.movie}  isLoading={isLoading}/>}/>
  );
};

export default MovieDetail;
