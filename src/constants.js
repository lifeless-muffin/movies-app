const COLORS = {
    // background colors
    primaryBackgroundColor: '#FFFFFF',
    backgroundColorTypeB: '#EFF1F3',
    
    // text colors
    primaryTextColor: '#222D34',
    textColorTypeB: '#5A5E62',
    textColorTypeC: '#4b5258',

    // border colors
    primaryBorderColor: '#D0D4D9'
}

const FILTERS = {
    // drop shadows
    primaryDropshadow: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
    
    // box shadows
    primaryBoxshadow: '0px 0px 2px 0px #bacbd3',
}

const FONTS = {
    primaryFontFamily: 'Inter, Lato, Arial',
    fontFamilyTypeB: 'Source Sans Pro, Lato, Arial',
    fontFamilyTypeC: 'Josefin Sans, Inter, Arial',
}

const BORDERS = {
    searchBarBorder: `1px solid ${COLORS.primaryBorderColor}`,
}

const DROPDOWNS = {
    searchBarDropdown: ['Movie', 'Show'],
    filterTypeDropdown: ['Movies', 'Shows'],
    filterOrderDropdown: ['Descending', 'Ascending'],
    filterSortDropdown: ['Popularity', 'Title', 'Date', 'Rating'],
    filtersGenreDropdown: ['Any Genre', 'Action', 'Adventure', 'Comedy', 'SCI-FI', 'Horror', 'Romance'],
}

const LISTS = {
    listOfPopularSearches: [
        {
            query: 'Euphoria',
            link: '/search?query=euphoria'
        },
        {
            query: 'Avengers',
            link: '/search?query=avengers'
        },
        {
            query: 'Ozark',
            link: '/search?query=ozark'
        },
        {
            query: 'Kobra Kai',
            link: '/search?query=euphoria'
        },
        {
            query: 'Game Of Thrones',
            link: '/search?query=euphoria'
        }
    ]
}

const URL = {
    tmdbApiURL: 'https://api.themoviedb.org/3',
    tmdbImagesURL: 'https://image.tmdb.org/t'
}

const API_XTOKEN = '3ac6f85f91f5f1947d9a8d7706fdf6b5' 

const MLIST = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

export {
    COLORS,
    FILTERS,
    BORDERS,
    FONTS,
    DROPDOWNS,
    LISTS,
    URL,
    API_XTOKEN,
    MLIST
}