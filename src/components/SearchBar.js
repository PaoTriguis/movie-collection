import React, { useState } from 'react';
import { Input, Box, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <Box display="flex" alignItems="center">
            <Input
                margin={5}
                type="text"
                placeholder="Search movies..."
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={handleSearch}
                ml={2}
                colorScheme="blue"
            />
        </Box>
    );
};

export default SearchBar;
