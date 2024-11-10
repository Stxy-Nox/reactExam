import React from "react";
import { getTrendings } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingPage = (props) => {

    const {data, error, isLoading, isError} = useQuery('trending',getTrendings)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    const favorites = movies.fillter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return(
        <PageTemplate 
            title={'Trending Movies'}
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};
export default TrendingPage;