import React, {
  useState,
} from 'react'
import { observer } from 'mobx-react'
import {
  FormControl,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import CustomizedAutocomplete from 'site/components/autocomplete'

import styles from './styles'

const useStyles = makeStyles(styles)

const dummyImageUrl = 'https://s3.ap-southeast-1.amazonaws.com/dmsasset-dev.prestodrycleaners.com.sg/uploads/e17dcbd3402fcf99rn_image_picker_lib_temp_d29d0aa3-4e6e-4df1-aeff-cb244e77d7e3.jpg'

const top100Films = [
  { label: 'The Shawshank Redemption', image: dummyImageUrl, user: '@shawshank' },
  { label: 'The Godfather', image: dummyImageUrl, user: '@Godfather' },
  { label: 'The Dark Knight', image: dummyImageUrl, user: '@DarkKnight' },
  { label: '12 Angry Men', image: dummyImageUrl, user: '@AngryMen' },
  { label: 'Schindler\'s List', image: dummyImageUrl, user: '@Schindler' },
  { label: 'Pulp Fiction', image: dummyImageUrl, user: '@Pulp' },
]

const SearchCreator = () => {
  const classes = useStyles()
  const [search, setSearch] = useState()

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div style={{ marginLeft: '2rem' }}>
      <form
        noValidate
        onSubmit={handleSearch}
        autoComplete="off"
        className={classes.searchWrapper}
      >
        <FormControl component="fieldset" fullWidth>
          <CustomizedAutocomplete
            label="Search creator"
            freeSolo
            className={classes.textfield}
            options={top100Films}
            sx={{ width: 333 }}
            classesAutocomplete={classes.textField}
            blurOnSelect
            value={search}
            renderOption={(option, state) => (
              <div {...option}>
                <img
                  className={classes.profileImg}
                  src={state.image}
                  alt={state.label}
                  width="28"
                  height="28"
                />
                <Typography variant="subtitle2" className={classes.username}>
                  {`${state.label} - ${state.user}`}
                </Typography>
              </div>
            )}
          />
        </FormControl>
      </form>
    </div>
  )
}

export default observer(SearchCreator)
