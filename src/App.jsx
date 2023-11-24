import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Explore, Detail, Search, PageNotFound } from "./pages"
import {  fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import {getApiConfiguration, getGenres} from "./redux/homeSlice"

function App() {
  const dispatch = useDispatch();



  const fetchDataConfig = async () => {
    try {
      const res = await fetchDataFromApi('/configuration');

      const url = {
        poster: res.images.secure_base_url + "original",
        backdrop: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};

  useEffect(()=>{
    fetchDataConfig()
    genresCall()
  },[])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
