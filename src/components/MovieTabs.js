import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';
import apiConfig from '../constants';

const MovieTabs = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    

    const fetchFavorites = async () =>{
        try {
            const url = `https://api.themoviedb.org/3/account/15880604/favorite/movies`
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${apiConfig.accessToken}`
                }};
            const response = await fetch(url, options);
            const data = await response.json();
            setFavoriteMovies(data.results)

        } catch (error) {
            console.log(error);
        }
    }

    const addRemoveFavorites = async (isFavorite, movieId, movie) =>{
        try {
            const url = `https://api.themoviedb.org/3/account/${apiConfig.userId}/favorite`
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: `Bearer ${apiConfig.accessToken}`
                },
                body: JSON.stringify({media_type: 'movie', media_id: movieId, favorite: !isFavorite})
            }
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            if(isFavorite) setFavoriteMovies(favoriteMovies => favoriteMovies.filter(entry=> entry.id !== movieId))
            else setFavoriteMovies(favoriteMovies => [...favoriteMovies, movie])
        } catch (error) {
            console.log(error);
        }
        
        
    }

    useEffect(() =>{
        fetchFavorites();
    }, [])

    return (
        <Tabs>
            <TabList>
                <Tab>Movie Explorer</Tab>
                <Tab>My Picks</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <HomePage addRemoveFavorites={addRemoveFavorites} favoriteMovies={favoriteMovies}/>
                </TabPanel>
                <TabPanel>
                    <FavoritesPage addRemoveFavorites={addRemoveFavorites} favoriteMovies={favoriteMovies}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default MovieTabs;

