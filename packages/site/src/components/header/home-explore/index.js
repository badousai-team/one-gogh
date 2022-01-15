import React from 'react'
import { observer } from 'mobx-react'
import {
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const ActionImg = styled('img')(({ theme }) => ({
  width: '30px',
  height: '30px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '-0.5rem',
  },
}))

const SearchCreator = () => {
  return (
    <div style={{ marginLeft: '2rem' }}>
      <IconButton>
        <ActionImg
          alt="Home"
          title="Home"
          src="/images/png/home.png"
        />
      </IconButton>
      <IconButton>
        <ActionImg
          alt="Home"
          title="Home"
          src="/images/png/explore.png"
        />
      </IconButton>
    </div>
  )
}

export default observer(SearchCreator)
