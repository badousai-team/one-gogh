import React, {
  useCallback,
} from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

// Material UI
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import MoreVertIcon from '@mui/icons-material/MoreVert'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import styles from './styles'

const useStyles = makeStyles(styles)

function Media(props) {
  const {
    loading = false,
    img,
    pastAction,
    actionTime,
    nft,
    id,
  } = props

  const route = useHistory()

  const seeDetails = useCallback(() => {
    route.push(`/nft/${id}`)
  }, [id])

  return (
    <Card
      sx={{ width: {
        sm: 200,
        md: 805,
      },
      m: 2,
      margin: 0,
      minHeight: {
        md: 500,
        sm: 100,
      } }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            'Ted @ted'
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            `${actionTime}`
          )
        }
      />
      <CardActionArea onClick={seeDetails}>

        {loading ? (
          <Skeleton
            sx={{ height: {
              sm: 100,
              md: 500,
            },
            }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            // height="100"
            image={img}
            alt="Nicola Sturgeon on a TED talk stage"
          />
        )}
      </CardActionArea>

      <CardActions disableSpacing>
        <Button
          variant="text"
          size="small"
          color="info"
          startIcon={(
            <img
              src="/images/svg/like.svg"
              alt="like"
              width="20px"
              height="20px"
            />
          )}
        >
          30
        </Button>
        <Button
          variant="text"
          size="small"
          color="warning"
          startIcon={(
            <img
              src="/images/svg/comment.svg"
              alt="like"
              width="20px"
              height="20px"
            />
          )}
        >
          6
        </Button>
        <Button
          variant="text"
          size="small"
          color="warning"
          startIcon={(
            <img
              src="/images/svg/preview-open.svg"
              alt="comment"
              width="20px"
              height="20px"
            />
          )}
          style={{ marginLeft: 'auto' }}
          disabled
        >
          32
        </Button>
      </CardActions>

      <CardContent style={{ paddingTop: 0, paddingBottom: 8 }}>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary" component="p">
              {pastAction}
            </Typography>
            <Typography variant="body2" color="text.primary" component="p">
              {nft}
            </Typography>
          </Stack>
        )}
      </CardContent>

    </Card>
  )
}

const Home = () => {
  const classes = useStyles()

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        <Stack spacing={0} alignItems="center" justifyContent="center" style={{ margin: '0.5rem' }}>
          <Media
            img="/images/png/wave-red.png"
            pastAction="Created"
            actionTime="5 hours ago"
            nft="Red Wave"
            id={1}
          />
          <Media
            img="/images/png/wave-blue.png"
            pastAction="Liked"
            actionTime="1 day ago"
            nft="Blue Wave"
            id={2}
          />
        </Stack>
      </Container>
    </Page>
  )
}

export default observer(Home)
