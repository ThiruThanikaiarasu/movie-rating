import React from 'react'
import MovieListComponent from '../MovieListComponent/MovieListComponent'
import { MovieState } from '../../Context/MovieContext'
import SearchResultComponent from '../SearchResultComponent/SearchResultComponent'
import { Box, Typography } from '@mui/material'

const HomeComponent = () => {

    const { filteredMovies, isSearchResultNone, lastSearch } = MovieState()

  return (
    <div className='home-container'>
        { filteredMovies && filteredMovies.length > 0 &&
                <SearchResultComponent movies={filteredMovies} heading="Search Result" />
        }
        { isSearchResultNone && 
                <Box
                    sx={{
                        paddingTop: '2em',
                        paddingLeft: '43px'
                    }}
                >
                    <Typography variant='h5'>No result found for `{lastSearch}`</Typography>
                </Box>
        }

        <MovieListComponent />
        <MovieListComponent />
    </div>
  )
}

export default HomeComponent