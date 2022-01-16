import React, {
  useCallback,
  useState,
} from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import {
  FormControl,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import CustomizedAutocomplete from 'site/components/autocomplete'
import { useRequest } from 'site/hooks'
import * as srv from 'site/services'

import styles from './styles'

const useStyles = makeStyles(styles)

const SearchCreator = () => {
  const route = useHistory()
  const classes = useStyles()
  const [creatorList, setCreatorList] = useState([])

  const {
    request: fetchCreator,
    loading: creatorLoading,
  } = useRequest(srv.fetchAllCreator, {
    concurrent: true,
    initialData: { list: [], total: 0 },
    transformData: (data) => {
      if (data && data.list.length > 0) {
        setCreatorList(data.list.map(item => {
          return {
            ...item,
            key: item.id,
            label: item.username,
          }
        }))
      }
    },
  })

  const handleSearchCreatorInputChange = useCallback((event, newValue) => {
    if (!newValue) {
      setCreatorList([])
      return
    }
    fetchCreator({ username: newValue })
  }, [])

  const handleChangeSearchCreator = useCallback((_, newValue) => {
    if (newValue?.username) {
      route.push(`/${newValue.username}`)
    }
  }, [])

  return (
    <div style={{ marginLeft: '1rem' }}>
      <FormControl component="fieldset" fullWidth>
        <CustomizedAutocomplete
          label="Search creator"
          freeSolo
          className={classes.textfield}
          sx={{ width: 300 }}
          classesAutocomplete={classes.textField}
          blurOnSelect
          handleInputChange={handleSearchCreatorInputChange}
          handleChange={handleChangeSearchCreator}
          options={creatorList}
          loading={creatorLoading}
          renderOption={(option, state) => (
            <div {...option}>
              <img
                className={classes.profileImg}
                src={state.profileUrl}
                alt={state.label}
                width="28"
                height="28"
              />
              <Typography variant="subtitle2" className={classes.username}>
                {state.label}
              </Typography>
            </div>
          )}
        />
      </FormControl>
    </div>
  )
}

export default observer(SearchCreator)
