import React from "react";
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
  Stack,
  Heading,
  CloseButton
} from "@chakra-ui/react";

const MovieDetailsModal = ({ movie, closeModal }) => {
    function toHoursAndMinutes(totalMinutes) {
        console.log(movie);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
      
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
      }
      
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      maxW="lg"
      minH="lg"
    >
        
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.original_title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{movie?.original_title}</Heading>

          <Text py="2">
            {movie.overview}
          </Text>
          <Text py="1">
            Release Date: <b>{movie?.release_date}</b>
          </Text>
          <Text py="1">
            Duration: <b>{toHoursAndMinutes(movie?.runtime)} hrs</b>
          </Text>
          <Text py="1">
            Budget: <b>${movie?.budget}</b>
          </Text>
        </CardBody>

        
      </Stack>
      <CloseButton size='md' onClick={closeModal}/>
    </Card>
  );
};

export default MovieDetailsModal;
