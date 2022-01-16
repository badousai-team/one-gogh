export default function styles({ breakpoints }) {
  return {
    page: {
      [breakpoints.down('sm')]: {
        padding: 'unset',
      },
    },
    container: {
      [breakpoints.down('sm')]: {
        padding: '0 1rem !important',
      },
    },
    infoItem: {
      display: 'table-row',
    },
    label: {
      display: 'table-cell',
      paddingRight: '1rem',
      lineHeight: 'inherit',
    },
    outerBorder: {
      position: 'relative',
      overflow: 'hidden',
      width: '559px',
      height: '438px',
      textAlign: 'justify',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    innerBorder: {
      position: 'absolute',
      left: 0,
      overflowX: 'hidden',
      overflowY: 'scroll',
      width: '559px',
      height: '438px',
      textAlign: 'justify',
      paddingLeft: '10px',
      paddingRight: '10px',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  }
}
