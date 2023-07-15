import React, {useState} from "react";
import ReactDOM from "react-dom";
import RatingBar from "./RatingBar";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { StarIcon, PlusSquareIcon, ExternalLinkIcon } from "@chakra-ui/icons";



const MovieCard = ({
  movies,
  favoriteMovies,
  handleAddFavorites,
  handleAddWatchlist,
  openModal
}) => {
  const favoriteIds = favoriteMovies?.map((movie) => movie.id);
  

  return (
    <>
      {movies
        ? movies.map((movie) => (
            <Card maxW="xs" key={movie.id} m={2} boxShadow='xl'>
              <CardBody>
                <Image
                  objectFit="cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Chakra UI"
                  onClick={() => openModal(movie.id)}
                />
                <Text align="center" justify="center" margin="2" >{movie.title}</Text>
                <RatingBar movieId={movie.id} />
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "86px",
                  },
                }}
              >
                {favoriteIds?.includes(movie.id) ? (
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<StarIcon color="gold" />}
                    onClick={() => handleAddFavorites(movie.id, movie)}
                  />
                ) : (
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<StarIcon />}
                    onClick={() => handleAddFavorites(movie.id, movie)}
                  />
                )}

                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<PlusSquareIcon />}
                  onClick={handleAddWatchlist}
                />
                <Button
                  flex="1"
                  variant="ghost"
                  onClick={() => openModal(movie.id)}
                  leftIcon={<ExternalLinkIcon />}
                />

              
              </CardFooter>
            </Card>
          ))
        : favoriteMovies.map((movie) => (
            <Card maxW="xs" key={movie.id}>
              <CardBody>
                <Image
                  objectFit="cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Chakra UI"
                  onClick={() => openModal(movie.id)}
                />
                <Text align="center" justify="center" margin="2" >{movie.title}</Text>
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "86px",
                  },
                }}
              >
                {favoriteIds?.includes(movie.id) ? (
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<StarIcon color="gold" />}
                    onClick={() => handleAddFavorites(movie.id, movie)}
                  />
                ) : (
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<StarIcon />}
                    onClick={() => handleAddFavorites(movie.id, movie)}
                  />
                )}
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<PlusSquareIcon />}
                  onClick={handleAddWatchlist}
                />
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<ExternalLinkIcon />}
                  onClick={() => openModal(movie.id)}
                />
              </CardFooter>
            </Card>
          ))}
    </>
  );
};

export default MovieCard;
