import React, {
  useCallback,
} from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
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
  const route = useHistory()

  const home = useCallback(() => {
    route.push('/')
  }, [])

  return (
    <div>
      <IconButton onClick={home}>
        <ActionImg
          alt="Home"
          title="Home"
          src="/images/png/home.png"
        />
      </IconButton>
      <IconButton>
        <ActionImg
          alt="Explore"
          title="Explore"
          src="/images/png/explore.png"
        />
      </IconButton>
    </div>
  )
}

export default observer(SearchCreator)
