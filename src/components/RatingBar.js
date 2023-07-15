import React, { useEffect, useState } from 'react';
import apiConfig from '../constants';
import { Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text } from '@chakra-ui/react';

const MovieRatingBar = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    fetchUserRating();
  }, []);

  useEffect(() => {
    if (userRating !== null) {
      setRating(userRating);
    }
  }, [userRating]);

  const handleRatingChange = (value) => {
    setRating(value);
    handleRateMovie(value);
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
        // Handle success response or update UI accordingly
        fetchUserRating(); // Fetch the user's updated rating
      })
      .catch((error) => {
        console.error('Error rating movie:', error);
        // Handle error or display error message
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
      // Handle error or display error message
    }
  };

  return (
<Box display="flex" alignItems="center" p={4}>
  <Slider
    min={0}
    max={10}
    step={0.5}
    value={rating}
    onChange={handleRatingChange}
    colorScheme="blue"
    defaultValue={userRating || 0}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb boxSize={6}>
      <Box color="white" fontWeight="bold" fontSize="sm">
        {rating}
      </Box>
    </SliderThumb>
  </Slider>

  {userRating !== null && (
    <Box ml={4}>
      <p>{userRating}</p>
    </Box>
  )}
</Box>

  );
};

export default MovieRatingBar;
