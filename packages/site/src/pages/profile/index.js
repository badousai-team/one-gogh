import React, { useState } from 'react'
import { observer } from 'mobx-react'
import clsx from 'clsx'

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

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import Banner from '../../../assets/images/png/banner.png'
import Image from '../../../assets/images/png/user-login.png'
import Card from './card'
import styles from './styles'

const useStyles = makeStyles(styles)

const Profile = () => {
  const classes = useStyles()
  const [copy, setCopy] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [overFlow, setOverflow] = useState(true)

  const character = 159

  const data = {
    banner: Banner,
    profilePhoto: Image,
    walletLabel: 'fbsdhfes66666fashfknekah88akhnslk',
    following: '20',
    followers: '30',
    name: 'Starry Night',
    userName: 'StarryNight',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nulla gravida risus mauris eget nisl dui. Hac a amet habitant augue tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    created: '20',
    owned: '20',
    liked: '35',
  }

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
    // {
    //   id: 1,
    //   icon:
    //   route:
    // },
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
            {`@${data.userName}`}
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
          {activeTab === 0 && <Card />}
        </Grid>
      </Container>
    </Page>
  )
}

export default observer(Profile)
