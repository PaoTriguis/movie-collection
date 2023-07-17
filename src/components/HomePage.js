import React, { useState, useEffect } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import apiConfig from "../constants";
import SearchBar from "./SearchBar";
import Modal from "react-modal";
import MovieDetailsModal from "./MovieDetailsModal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const HomePage = ({ favoriteMovies, addRemoveFavorites }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(Math.min(totalPages, 5));
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentMovieDetails, setCurrentMovieDetails] = useState("");

  const fetchMovies = async (page, query = "") => {
    try {
      const url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiConfig.key}&query=${query}&page=${page}`
        : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiConfig.key}&page=${page}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);

      if (!query) {
        setDefaultMovies(data.results);
      }
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

  const handleGoBack = () => {
    setMovies(defaultMovies);
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddFavorites = (movieId, movie) => {
    const favoriteMoviesIds = favoriteMovies.map((movie) => movie.id);
    const isFavorite = favoriteMoviesIds.includes(movieId);
    console.log(isFavorite, movieId, movie);
    addRemoveFavorites(isFavorite, movieId, movie);
  };

  const handleAddWatchlist = () => {};

  function openModal(movieId) {
    setIsOpen(true);

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiConfig.accessToken}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setCurrentMovieDetails(json))
      .catch((err) => console.error("error:" + err));
  }

  function closeModal() {
    setIsOpen(false);
  }

  const visiblePageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <MovieDetailsModal
          closeModal={closeModal}
          movie={currentMovieDetails}
        />
      </Modal>

      {searchQuery && (
        <Button onClick={handleGoBack} variant="outline" mt={4} ml={4}>
          Back
        </Button>
      )}

      <Flex flexWrap="wrap" justify="center">
        <MovieCard
          movies={movies}
          favoriteMovies={favoriteMovies}
          handleAddFavorites={handleAddFavorites}
          handleAddWatchlist={handleAddWatchlist}
          openModal={openModal}
        />
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
            variant={currentPage === page ? "solid" : "outline"}
            colorScheme={currentPage === page ? "blue" : undefined}
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
