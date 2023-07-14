import React from 'react';
import { Flex } from '@chakra-ui/react';
import MovieCard from './MovieCard';


const FavoritesPage = ({favoriteMovies, addRemoveFavorites}) => {
    const handleAddFavorites = (movieId, movie) =>{
        const isFavorite = true;
        addRemoveFavorites(isFavorite, movieId, movie)
    }

    const handleAddWatchlist = () =>{

    }

  return (
    <Flex flexWrap="wrap" justify="center">
        <MovieCard favoriteMovies={favoriteMovies} handleAddFavorites={handleAddFavorites} handleAddWatchlist={handleAddWatchlist}/>
    </Flex>
  )
}

export default FavoritesPage