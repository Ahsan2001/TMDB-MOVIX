import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../LazyLoadImage';
import ContentWrapper from '../ContentWrapper';

const Banner = () => {


  const [query, setQuery] = useState("");
  const [bg, setBg] = useState("");
  const navigate = useNavigate()
  const { data, loading, error } = useFetch("/movie/upcoming")
  const { url } = useSelector((state) => state.home)


  useEffect(() => {
    const backgroundImage = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBg(backgroundImage);
  }, [data])

  const searchQueryHandler = () => {
    if (query.trim().length > 0) {
      navigate(`/search/${query}`);
    } else {
      console.error('Search query is empty');
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchQueryHandler();
    }
  }

  return (

    <div className='heroBanner'>
      {
        !loading && (
          <div className='backdrop-img'>
            <Img src={bg} />
          </div>)
      }
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>

  )
}
export default Banner