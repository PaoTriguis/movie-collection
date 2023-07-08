import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import { StarIcon, PlusSquareIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import apiConfig from '../constants';

const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(Math.min(totalPages, 5));

    const fetchMovies = async (page) => {
        try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiConfig.key}&page=${page}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
        } catch (error) {
        setError(error.message);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
        window.scrollTo(0, 0);
    }, [currentPage]);

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    const visiblePageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <Box>
            <Flex flexWrap="wrap" justify="center">
                {movies.map((movie) => (
                <Card maxW="xs" key={movie.id}>
                    <CardBody>
                    <Image
                        objectFit="cover"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Chakra UI"
                    />
                    <Text>{movie.title}</Text>
                    </CardBody>

                    <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                        '& > button': {
                        minW: '86px',
                        },
                    }}
                    >
                    <Button flex="1" variant="ghost" leftIcon={<StarIcon />} />
                    <Button flex="1" variant="ghost" leftIcon={<PlusSquareIcon />} />
                    <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />} />
                    </CardFooter>
                </Card>
                ))}
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

export default MovieCard;
