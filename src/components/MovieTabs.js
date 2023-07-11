import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react';
import HomePage from './HomePage';

const MovieTabs = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Movie Explorer</Tab>
                <Tab>My Picks</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <HomePage />
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default MovieTabs;

