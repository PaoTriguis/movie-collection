import React, { useEffect, useState } from 'react';
import apiConfig from '../constants';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Button } from '@chakra-ui/react';

const MovieRatingBar = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [generalRating, setGeneralRating] = useState(null);

  useEffect(() => {
    fetchUserRating();
    fetchGeneralRating();
  }, []);

  useEffect(() => {
    if (userRating !== null && generalRating !== null) {
      const updatedRating = (userRating + generalRating) / 2;
      setRating(updatedRating);
    }
  }, [userRating, generalRating]);

  const handleRateButtonClick = () => {
    handleRateMovie(rating);
  };

  const handleRateMovie = (value) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const bodyParams = {
      value: value,
    };
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${apiConfig.accessToken}`,
    };

    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyParams),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Rating submitted successfully:', data);
        fetchUserRating(); 
      })
      .catch((error) => {
        console.error('Error rating movie:', error);
      });
  };

  const fetchUserRating = async () => {
    try {
      const url = `https://api.themoviedb.org/3/account/15880604/rated/movies`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiConfig.accessToken}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const movieRating = data.results.find((result) => result.id === movieId)?.rating;
      setUserRating(movieRating);
      console.log(movieRating);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGeneralRating = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiConfig.accessToken}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      const movieRating = data.vote_average;
      setGeneralRating(movieRating);
      console.log(movieRating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Box display="flex" w="90%" flexDirection="row">
        <Slider
          min={0}
          max={10}
          step={0.5}
          value={rating}
          onChange={setRating}
          colorScheme="blue"
          defaultValue={userRating || 0}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={4} boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)">

          </SliderThumb>
        </Slider>

        <Button colorScheme="blue" ml={4} onClick={handleRateButtonClick}>
          Rate
        </Button>
      </Box>

      <Box>
      {userRating !== null && (
        <Box ml={4} p={2}>
          <p>Your Rating: {userRating}</p>
        </Box>
      )}

      {generalRating !== null && (
        <Box ml={4}>
          <p>General Rating: {generalRating}</p>
        </Box>
      )}
      </Box>
    </Box>
  );
};

export default MovieRatingBar;
