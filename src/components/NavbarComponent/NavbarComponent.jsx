import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import Select from '@mui/material/Select'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { styled, alpha } from '@mui/material/styles'
import logo from '../../assets/logo.png'
import InputBase from '@mui/material/InputBase' 
import axios from 'axios'
import { MovieState } from '../../Context/MovieContext'

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
    },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1), // Adjust the padding to have equal spacing
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}))


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledSelect = styled(Select)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    '& .MuiSelect-select': {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create('width'),
      width: 'auto',
      minWidth: '60px',
      paddingLeft: '15px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.white, 0.25),
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.white, 0.5),
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.white, 0.75),
    },
    '& .MuiMenu-paper': {
      backgroundColor: 'black', // Set dropdown menu background color to black
    },
}))
  
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: 'black', // Set dropdown menu item text color to white
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25), // Add hover effect if needed
    },
}))
  
  

function HideOnScroll(props) {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
})

    return (
        <Slide appear={false} direction="down" in={!trigger}>
        {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}

export default function NavbarComponent(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const [isLogin, setIsLogin] = React.useState(false) // State to toggle between Sign Up and Profile
    const [filter, setFilter] = React.useState('all')
    const [inputSearch, setInputSearch] = React.useState('')
    const { setFilteredMovies, setIsSearchResultNone, setLastSearch } = MovieState()


    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleSignUp = () => {
        // Implement sign up logic here
    }

    const handleSearchChange = (event) => {
        // setFilteredMovies([])
        setIsSearchResultNone(false)
        setInputSearch(event.target.value)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if(filter && inputSearch.trim() !== '') {
            event.preventDefault()
            setFilteredMovies([])
            setLastSearch(inputSearch)
            let url 

            if(filter != 'all') {
                // url = `http://localhost:3500/api/v1/movie?${filter}=${inputSearch}`
                url = `https://movie-rating-server.vercel.app/api/v1/movie?${filter}=${inputSearch}`
            } else {
                // url = `http://localhost:3500/api/v1/movie/${inputSearch}`
                url = `https://movie-rating-server.vercel.app/api/v1/movie/${inputSearch}`
            }
            
            axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    // setRandomMovies(response.data.data)
                    setInputSearch('')
                    if(response.data.data.length == 0){
                        setIsSearchResultNone(true)
                    } else {
                        setFilteredMovies(response.data.data)
                    }
                    // if(response.data.){
                        //     setIsSearchResultNone(true)
                        // }
                    }
                })
                .catch((error) => {
                    alert(`Status : ${error.message}`);
                });
            }
        }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
)

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                sx={{
                    backgroundColor: "#121212"
                }}
                >
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, ml: 5 }}
                    >
                    <img src={logo} alt="Logo" style={{ width: '2em' }} />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        onChange={handleChange}
                    >
                        <StyledMenuItem value={'all'}>All</StyledMenuItem>
                        <StyledMenuItem value={'title'}>Movies</StyledMenuItem>
                        <StyledMenuItem value={'genre'}>Genre</StyledMenuItem>
                        <StyledMenuItem value={'director'}>Director</StyledMenuItem>
                    </StyledSelect>
                    <form onSubmit={(event) => handleSearchSubmit(event)}>
                        <Search
                            // component='form'
                            // onSubmit={handleSearchSubmit}
                        >
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={inputSearch}
                                onChange={handleSearchChange}
                            />
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                        </Search>
                    </form>
                    

                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {!isLogin ? ( // Show Sign Up button if not logged in
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="sign up"
                        onClick={handleSignUp}
                        sx={{ 
                            color: 'inherit',
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)', // Example hover background color
                            },
                            borderRadius: '10px',
                            paddingY: '6px',
                            marginRight: '5px'
                        }}
                    >
                        <Typography variant="body1" sx={{ mr: 1, textAlign: 'center' }}>
                        Sign Up
                        </Typography>
                    </IconButton>
                    ) : (
                    <React.Fragment>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                        </Box>
                    </React.Fragment>
                    )}
                </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            {renderMobileMenu}
            {renderMenu}
        </React.Fragment>
    )
}
