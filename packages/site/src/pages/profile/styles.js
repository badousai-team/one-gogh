export default function styles() {
  return {
    icon: {
      fontSize: 24,
    },
    igIcon: {
      fontSize: 30,
    },
    emailIcon: {
      fontSize: 32,
    },
    image: {
      height: '256px',
      borderRadius: '0 0 12px 12px',
    },
    buttonPosition: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    editButton: {
      width: '10.4rem',
      //   backgroundColor: color.white,
      marginTop: '2.125rem',
    },
    info: {
      marginLeft: '2.5rem',
      marginTop: '12px',
    },
    textPosition: {
      display: 'flex',
      flexDirection: 'row',
    },
    avatar: {
      width: '5.5rem',
      height: '5.5rem',
      marginTop: '13.3rem',
      marginLeft: '2.5rem',
      //   marginRight: '1.5rem',
      //   backgroundColor: 'red',
      border: '4px solid #fff',
      position: 'absolute',
    },
    userInfo: {
      marginTop: '1.6rem',
    },
    text: {
      textTransform: 'uppercase',
    //   color: 'white',
    },
    divider: {
      height: '1rem',
      margin: '3px 12px 0 12px',
      backgroundColor: 'white',
    },
    cityText: {
      textTransform: 'capitalize',
    //   color: 'white',
    },
    upperIcon: {
      marginTop: '1.6rem',
    },
    visibility: {
      marginRight: '1.8rem',
      backgroundColor: 'red',
    //   color: 'white',
    },
    share: {
    //   color: 'white',
    },
    tabs: {
      backgroundColor: 'white',
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '1rem 0 0.5rem 0',
    },
    tab: {
      // fontSize: '0.875rem',
      // fontWeight: 500,
      // letterSpacing: '1.25px',
      textTransform: 'capitalize',
      flexDirection: 'row',
      '& .MuiSvgIcon-root': {
        marginRight: '10px',
      },
      '& .Mui-selected': {
        color: 'black',
      },
    },
    wrapper: {
      flexDirection: 'row',
    },
    bottomContainer: {
      marginTop: '31px',
    },
    textOverflow: {
      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 2,
      wordBreak: 'break-all',
      overflow: 'hidden',
    },
    bio: {
      fontWeight: 300,
      marginTop: '8px',
      width: '35rem',
    },
    link: {
      color: '#969696',
    },
    copyIcon: {
      color: 'black',
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
    action: {
      marginTop: '15px',
    },
    following: {
      marginRight: '33px',
    },
    boxTab: {
      borderBottom: 1,
      borderColor: 'divider',
      margin: '1rem 2.5rem 0 2.5rem',
    },
    chipContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
    },
  }
}
