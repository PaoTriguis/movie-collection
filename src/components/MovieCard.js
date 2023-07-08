import { Card, CardHeader, CardBody, CardFooter, Flex, SimpleGrid, Box, Avatar, IconButton, Heading, Text, Image, Button } from '@chakra-ui/react'
import { StarIcon, PlusSquareIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';
import apiConfig from '../constants'

const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiConfig.key}`
            );
    
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
    
            const data = await response.json();
            setMovies(data.results);
            console.log(data);
            } catch (error) {
            setError(error.message);
            }
        };
    
        fetchMovies();
        }, []);
    
        if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Flex flexWrap="wrap" justify="center">
        {movies.map((movie) => (
            <Card maxW='xs'>
                <CardBody>
                    <Image
                    objectFit='cover'
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt='Chakra UI'
                    />
                    <Text>{movie.title}</Text>
                </CardBody>

                <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                    minW: '86px',
                    },
                }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<StarIcon />}>
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<PlusSquareIcon />}>
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<ExternalLinkIcon />}>
                    </Button>
                </CardFooter>
            </Card>

        ))}
        </Flex>
    );
};

export default MovieCard;

