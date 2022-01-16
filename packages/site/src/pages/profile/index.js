import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import clsx from 'clsx'
import { useStores, useApiRequest } from 'site/hooks'
import * as srv from 'site/services'

// Material UI
import {
  Avatar,
  Chip,
  Typography,
  CardMedia,
  Tabs,
  Tab,
  Stack,
  Link as MuiLink,
  Box,
  Grid,
  Button,
} from '@mui/material'
import {
  Check,
  ContentCopy,
  CameraAltOutlined,
  Instagram,
  Twitter,
  BrushOutlined,
  AccountBalanceWalletOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material'
import makeStyles from '@mui/styles/makeStyles'
import { useParams } from 'react-router-dom'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import Banner from '../../../assets/images/png/banner.png'
import image from '../../../assets/images/png/user-login.png'
import customIcon from '../../../assets/images/png/icon.png'
import Card from './card'
import styles from './styles'

const useStyles = makeStyles(styles)

const Profile = () => {
  const classes = useStyles()
  const [copy, setCopy] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [overFlow, setOverflow] = useState(true)
  const { creatorStore, accountStore } = useStores()
  const { username } = useParams()

  const {
    request: followOtherCreator,
  } = useApiRequest(srv.followOtherCreator, { blocking: true })

  const fetch = () => {
    creatorStore.fetchProfile(username)
  }

  useEffect(() => {
    fetch()
  }, [username])

  const character = 159

  const data = useMemo(() => {
    const creator = creatorStore.selected
    return {
      id: creator?.id,
      banner: Banner,
      profilePhoto: creator?.profileUrl || image,
      walletLabel: creator?.address,
      following: creator?.following,
      followers: creator?.follower,
      name: creator?.name,
      username: creator?.username,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nulla gravida risus mauris eget nisl dui. Hac a amet habitant augue tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      created: '20',
      owned: '20',
      liked: '35',
      follow: creator?.follow,
    }
  }, [creatorStore.selected, username])

  const handleCopy = () => {
    setCopy(true)
    console.log('You clicked the copy icon.')
    setTimeout(() => { setCopy(false) }, 1000)
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const handleText = () => {
    setOverflow(!overFlow)
  }

  const handleFollow = async () => {
    await followOtherCreator(data?.id)
    fetch()
  }

  const tabItem = [
    {
      icon: <BrushOutlined className={classes.icon} />,
      label: `created ${data.created}`,
    },
    {
      icon: <AccountBalanceWalletOutlined className={classes.icon} />,
      label: `owned ${data.owned}`,
    },
    {
      icon: <FavoriteBorderOutlined className={classes.icon} />,
      label: `liked ${data.liked}`,
    },
  ]

  const sosMed = [
    {
      id: 1,
      icon: <Avatar alt="" src={customIcon} className={classes.customIcon} />,
      route: '',
    },
    {
      id: 2,
      icon: <Instagram fontSize="small" className={classes.iconColor} />,
      route: 'https://twitter.com/',
    },
    {
      id: 3,
      icon: <Twitter fontSize="small" className={classes.iconColor} />,
      route: 'https://www.instagram.com/',
    },
  ]

  if (!creatorStore.selected) {
    return (
      <div style={{ marginTop: '6rem', minHeight: '80vh', textAlign: 'center' }}>
        User Not found
      </div>
    )
  }

  return (
    <Page>
      <Container>
        <CardMedia
          image={data.banner}
          title=""
          className={classes.image}
        >
          <Avatar
            alt=""
            src={data.profilePhoto}
            className={classes.avatar}
          />
          <Avatar className={classes.camera}>
            <CameraAltOutlined
              fontSize="small"
              className={classes.cameraIcon}
            />
          </Avatar>
        </CardMedia>
        <div className={classes.chipContent}>
          <Chip
            label={data.walletLabel}
            variant="outlined"
            onDelete={handleCopy}
            deleteIcon={copy ? <Check /> : <ContentCopy />}
            className={classes.chipWallet}
          />
          <Stack
            direction="row"
            alignItems="center"
          >
            {sosMed.map(item => (
              <Avatar
                key={item.id}
                className={classes.sosmed}
              >
                {item.icon}
              </Avatar>
            ))}
            <Chip
              label="Edit Profile"
              variant="outlined"
              className={classes.editProfile}
            />
          </Stack>
        </div>
        <Stack className={classes.info}>
          <Typography variant="h1">
            {data.name}
          </Typography>
          <Typography variant="h4">
            {`@${data.username}`}
          </Typography>
          <Typography
            variant="h4"
            className={clsx(
              classes.bio,
              overFlow && classes.textOverflow,
            )}
          >
            {data.bio}
          </Typography>
          <div>
            {data.bio.length > character && (
              <MuiLink
                component="button"
                variant="body2"
                underline="hover"
                onClick={handleText}
                className={classes.link}
              >
                {overFlow ? 'more' : 'less'}
              </MuiLink>
            )}
          </div>
          <Stack
            direction="row"
            className={classes.action}
            alignItems="center"
          >
            <Typography
              variant="h4"
              className={classes.following}
            >
              {`${data.following} Following`}
            </Typography>
            <Typography variant="h4">
              {`${data.followers} Followers`}
            </Typography>
            {data.username !== accountStore?.user?.username && (
              <Button
                variant="contained"
                style={{ margin: '0 1rem' }}
                onClick={handleFollow}
              >
                {data.follow ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </Stack>
        </Stack>
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          margin: '1rem 2.5rem 0 2.5rem',
        }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="primary"
          >
            {tabItem.map(item => (
              <Tab
                key={item.label}
                icon={item.icon}
                label={item.label}
                disableRipple
                className={classes.tab}
              />
            ))}
          </Tabs>
        </Box>
        <Grid className={classes.tabContent}>
          {activeTab === 0 && (
            <Card
              name={data.name || data.username}
              photo={data.profilePhoto}
              step="0"
            />
          )}
          {activeTab === 1 && (
            <Card
              name={data.name || data.username}
              photo={data.profilePhoto}
              step="1"
            />
          )}
          {activeTab === 2 && (
            <Card
              name={data.name || data.username}
              photo={data.profilePhoto}
              step="2"
            />
          )}
        </Grid>
      </Container>
    </Page>
  )
}

export default observer(Profile)
