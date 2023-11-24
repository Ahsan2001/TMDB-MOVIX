import React from 'react'
import { Banner, Layout } from '../../components'
import Trending from './trending'
import Popular from './popular'
import TopRated from './topRated'

const Home = () => {
  document.title = "Welcome to Movix";

  return (
    <Layout>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </Layout>
  )
}

export default Home