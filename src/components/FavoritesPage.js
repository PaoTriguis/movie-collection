import React, {useState} from 'react';
import { Flex } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import Modal from "react-modal";
import MovieDetailsModal from "./MovieDetailsModal";
import apiConfig from "../constants";

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

const FavoritesPage = ({favoriteMovies, addRemoveFavorites}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currnetMovieDetails, setCurrnetMovieDetails] = useState("");

    const handleAddFavorites = (movieId, movie) =>{
        const isFavorite = true;
        addRemoveFavorites(isFavorite, movieId, movie)
    }

    const handleAddWatchlist = () =>{

    }

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
        .then((json) => setCurrnetMovieDetails(json))
        .catch((err) => console.error("error:" + err));
    }
  
    function closeModal() {
      setIsOpen(false);
    }

  return (
    <Flex flexWrap="wrap" justify="center">
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <MovieDetailsModal
          closeModal={closeModal}
          movie={currnetMovieDetails}
        />
      </Modal>
        <MovieCard favoriteMovies={favoriteMovies} handleAddFavorites={handleAddFavorites} handleAddWatchlist={handleAddWatchlist} openModal={openModal}/>
    </Flex>
  )
}

export default FavoritesPage