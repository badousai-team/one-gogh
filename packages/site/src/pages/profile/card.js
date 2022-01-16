import React from 'react'
import { observer } from 'mobx-react'
import clsx from 'clsx'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Grid,
  Stack,
  Divider,
} from '@mui/material'
import {
  FavoriteBorderOutlined,
  ChatBubbleOutline,
  IosShare,
} from '@mui/icons-material'
import makeStyles from '@mui/styles/makeStyles'

import Image from '../../../assets/images/png/user-login.png'
import styles from './styles'

const useStyles = makeStyles(styles)

const CardItem = ({ name, photo, step }) => {
  const classes = useStyles()

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar
            alt=""
            src={photo}
          />
        )}
        action={(
          step === '1' && (
            <Chip
              label="Follow"
              onClick={handleClick}
            />
          )
        )}
        title="Created by"
        subheader={step !== '1' ? name : 'Picasso'}
      />
      <CardMedia
        component="img"
        height="329"
        image={photo}
        alt=""
      />
      <CardContent>
        <Typography variant="h3">
          Metaverse
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          className={classes.cardIcon}
        >
          <Stack direction="row">
            <Grid className={clsx(
              classes.cardIconContent,
              classes.cardFavoriteIcon,
            )}
            >
              <FavoriteBorderOutlined
                fontSize="small"
                className={classes.cardIconDetail}
              />
              <Typography>50</Typography>
            </Grid>
            <Grid className={classes.cardIconContent}>
              <ChatBubbleOutline
                fontSize="small"
                className={classes.cardIconDetail}
              />
              <Typography>10</Typography>
            </Grid>
          </Stack>
          <IosShare fontSize="small" />
        </Stack>
        <Divider className={classes.cardDivider} />
        <CardHeader
          avatar={(
            <Avatar
              alt=""
              src={Image}
            />
          )}
          action={(
            step !== '1' && (
              <Chip
                label="Follow"
                onClick={handleClick}
              />
            )
          )}
          title="Owned by"
          subheader={step !== '1' ? 'Picasso' : name}
          className={classes.cardOwned}
        />
      </CardContent>
    </Card>
  )
}

export default observer(CardItem)
