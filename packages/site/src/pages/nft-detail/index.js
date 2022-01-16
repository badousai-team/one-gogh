import React, {
  useEffect,
} from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

// Material UI
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import { useApiRequest } from 'site/hooks'
import * as srv from 'site/services'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import styles from './styles'

import { dateFormat } from '../../utils/helper'

const useStyles = makeStyles(styles)

function MediaRight() {
  const classes = useStyles()

  return (
    <Card
      sx={{
        m: 2,
        margin: 0,
        adding: 0,
        borderRadius: '15px 15px 0px 0px',
      }}
      variant="outlined"
    >
      <div className={classes.outerBorder}>
        <div className={classes.innerBorder}>
          <div className={classes.content}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src="https://avatarfiles.alphacoders.com/816/81602.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Tamara @tamara" secondary="good picture buddy" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="https://avatarfiles.alphacoders.com/166/166630.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Maria Illesaca @maria" secondary="Nice one!" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="https://hapskorea.com/wp-content/uploads/2012/11/PSY4.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Jhone @jhone" secondary="nice!" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="https://lh3.googleusercontent.com/L2Lvy3--2Si47Sa2vZ87dvmqLwdboFAyp9BkGO6UjDtYVYnIQJ_me6G-Ube9Q7lF-AyPjdaBw2eJItViWMtNswjHj10i7xu0MkcQuw"
                  />
                </ListItemAvatar>
                <ListItemText primary="Benson @neb" secondary="I really like it! Awesome work" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="https://shopage.s3.amazonaws.com/media/f855/580321926366_PEnByxR6Xdn7soyNMiGPG4ZPMng1N4CN4D4XvB7j.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Gorillaz @gorillaz" secondary="wow!" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="https://music-artwork.com/wp-content/uploads/2018/04/dec110.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary="Unknown @unknown" secondary="lit!" />
              </ListItem>

            </List>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Media(props) {
  const {
    loading = false,
    img,
    tokenId,
    createdAt,
  } = props

  const classes = useStyles()

  return (
    <Stack>
      <Card sx={{ m: 2, margin: 0, padding: 0, borderRadius: '15px 15px 0px 0px' }} variant="outlined">

        {loading ? (
          <Skeleton sx={{ height: 386 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            sx={{ borderRadius: '15px 0px 0px' }}
            component="img"
            height="386"
            width="549"
            image={img}
            alt="Nicola Sturgeon on a TED talk stage"
          />
        )}
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
      </Card>

      <Card sx={{ m: 2, margin: '1rem 0 0 0', padding: '16px' }} variant="outlined">
        {[
          {
            id: 1,
            label: 'Token Id',
            value: tokenId,
          },
          {
            id: 2,
            label: 'Created on',
            value: createdAt,
          },
          {
            id: 3,
            label: 'Author',
            value: 'Ted @ted',
          }].map((d) => {
          return (
            <div className={classes.infoItem} key={d.id}>
              <Typography variant="subtitle2" className={classes.label}>
                {d.label}
              </Typography>
              <Typography
                variant="subtitle2"
              >
                {d.value}
              </Typography>
            </div>
          )
        })}
      </Card>
    </Stack>
  )
}

const NFTDetails = () => {
  const classes = useStyles()
  const { id } = useParams()

  const {
    request: fetchNFTById,
    data,
  } = useApiRequest(srv.fetchNFTById, { blocking: false })

  useEffect(() => {
    if (id) {
      const fetchBookingData = async () => {
        await fetchNFTById(id)
      }
      fetchBookingData()
    }
  }, [id])

  if (!data?.nft) return null

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        <Stack
          direction="row"
          spacing={6}
          alignItems="flex-start"
          justifyContent="center"
          style={{ margin: '0.5rem' }}
        >
          <Media
            img={data.nft.imageUrl || '/images/png/wave-red.png'}
            tokenId={data.nft.nftAddress}
            createdAt={dateFormat(data.nft.createdAt)}
          />
          <MediaRight />
        </Stack>
      </Container>
    </Page>
  )
}

export default observer(NFTDetails)
