import React, { useState, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import apiConfig from '../constants';
import SearchBar from './SearchBar';

const HomePage = ({favoriteMovies, addRemoveFavorites}) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(Math.min(totalPages, 5));
    const [searchQuery, setSearchQuery] = useState('');

    const fetchMovies = async (page, query = '') => {
        try {
        const url = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiConfig.key}&query=${query}&page=${page}`
            : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiConfig.key}&page=${page}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        } catch (error) {
        setError(error.message);
        }
    };



    useEffect(() => {
        fetchMovies(currentPage, searchQuery);
        window.scrollTo(0, 0);
    }, [currentPage, searchQuery]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (currentPage > 5) {
        setStartPage(currentPage - 4);
        setEndPage(currentPage);
        } else {
        setStartPage(1);
        setEndPage(Math.min(totalPages, 5));
        }
    }, [currentPage, totalPages]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const visiblePageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    const handleAddFavorites = (movieId, movie) =>{
        const favoriteMoviesIds = favoriteMovies.map(movie => movie.id)
        const isFavorite = favoriteMoviesIds.includes(movieId);
        console.log(isFavorite, movieId, movie);
        addRemoveFavorites(isFavorite, movieId, movie)
    }

    const handleAddWatchlist = () =>{

    }

    return (
        <Box>
        <SearchBar onSearch={handleSearch} />

        <Flex flexWrap="wrap" justify="center">
            <MovieCard movies={movies} favoriteMovies={favoriteMovies} handleAddFavorites={handleAddFavorites} handleAddWatchlist={handleAddWatchlist}/>
        </Flex>

        <Flex justify="center" mt={4}>
            {currentPage > 1 && (
            <Button onClick={handlePreviousPage} mr={2} variant="outline">
                Previous
            </Button>
            )}

            {visiblePageNumbers.map((page) => (
            <Button
                key={page}
                onClick={() => handlePageClick(page)}
                variant={currentPage === page ? 'solid' : 'outline'}
                colorScheme={currentPage === page ? 'blue' : undefined}
            >
                {page}
            </Button>
            ))}

            {currentPage < totalPages && (
            <Button onClick={handleNextPage} ml={2} variant="outline">
                Next
            </Button>
            )}
        </Flex>
        </Box>
    );
};

export default HomePage;
