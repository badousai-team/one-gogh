const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
}

export default (theme) => ({
  textfield: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1rem + ${theme.spacing(4)})`,
      width: '300px',
      color: grey[900],
      background: grey[50],
      border: grey[300],
      borderRadius: '8px',
      [theme.breakpoints.down('md')]: {
        width: '100px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '&:hover': {
        background: grey[100],
        borderColor: grey[400],
      },
    },
  },
  iconWrapper: {
    padding: '10px',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    borderRadius: '50%',
  },
  username: {
    paddingLeft: '0.5rem',
  },
})
