import React from 'react'
import { observer } from 'mobx-react'
import {
  Button,
} from '@mui/material'

const CreateNFT = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        borderRadius: '1rem',
        marginRight: '0.5rem',
      }}
    >
      Create
    </Button>
  )
}

export default observer(CreateNFT)
