import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import { StarIcon, PlusSquareIcon, ExternalLinkIcon } from '@chakra-ui/icons';

const MovieCard = ({ movies, favoriteMovies, handleAddFavorites, handleAddWatchlist }) => {
    
   
    
    return (
        <>{movies ? movies.map((movie) => (
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
                <Button flex="1" variant="ghost" leftIcon={<StarIcon />} onClick={() => handleAddFavorites(movie.id, movie)}/>
                <Button flex="1" variant="ghost" leftIcon={<PlusSquareIcon />} onClick={handleAddWatchlist}/>
                <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />} />
            </CardFooter>
            </Card>
        )) : 
                
         favoriteMovies.map((movie) => (
            
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
                <Button flex="1" variant="ghost" leftIcon={<StarIcon />} onClick={() => handleAddFavorites(movie.id, movie)}/>
                <Button flex="1" variant="ghost" leftIcon={<PlusSquareIcon />} onClick={handleAddWatchlist}/>
                <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />} />
            </CardFooter>
            </Card>
        ))
            }  
        
        </>
    );
};

export default MovieCard;
