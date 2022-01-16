export default function styles() {
  return {
    icon: {
      fontSize: 24,
    },
    iconColor: {
      color: '#C4C4C4',
    },
    image: {
      height: '256px',
      borderRadius: '0 0 12px 12px',
    },
    avatar: {
      width: '5.5rem',
      height: '5.5rem',
      marginTop: '13.3rem',
      marginLeft: '2.5rem',
      border: '4px solid #fff',
      position: 'absolute',
    },
    camera: {
      position: 'relative',
      marginLeft: '6rem',
      marginTop: '16.5rem',
      width: 32,
      height: 32,
    },
    cameraIcon: {
      color: '#4B4B4B',
    },
    chipContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
    },
    chipWallet: {
      width: '9rem',
      marginLeft: '9rem',
    },
    sosmed: {
      marginRight: '6px',
      width: 37,
      height: 37,
      backgroundColor: '#fff',
      border: '1px solid #C4C4C4',
    },
    editProfile: {
      marginLeft: '8px',
      marginRight: '2.5rem',
    },
    info: {
      marginLeft: '2.5rem',
      marginTop: '12px',
    },
    bio: {
      fontWeight: 300,
      marginTop: '8px',
      width: '35rem',
    },
    textOverflow: {
      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 2,
      wordBreak: 'break-all',
      overflow: 'hidden',
    },
    link: {
      color: '#969696',
    },
    action: {
      marginTop: '15px',
    },
    following: {
      marginRight: '33px',
    },
    tab: {
      textTransform: 'capitalize',
      flexDirection: 'row',
      '& .MuiSvgIcon-root': {
        marginRight: '10px',
      },
    },
    tabContent: {
      margin: '2.5rem',
    },
    card: {
      maxWidth: 345,
      borderRadius: '1rem',
    },
    cardIcon: {
      marginTop: '20px',
    },
    cardIconContent: {
      display: 'flex',
      alignItems: 'center',
    },
    cardFavoriteIcon: {
      marginRight: '20px',
    },
    cardIconDetail: {
      marginRight: '3px',
    },
    cardDivider: {
      margin: '15px 0',
    },
    cardOwned: {
      padding: 0,
    },
  }
}
