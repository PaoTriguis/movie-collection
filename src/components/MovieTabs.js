import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, IconButton, Heading, Text, Image, Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react';
import MovieCard from './MovieCard';

const MovieTabs = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Movie Explorer</Tab>
                <Tab>My Picks</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <MovieCard />
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default MovieTabs;

