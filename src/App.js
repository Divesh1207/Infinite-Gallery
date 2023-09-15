import React, { useState, useEffect } from "react";

import './index.css';

import CardComponent from "./CardComponent";



const clientId = `?client_id=${process.env.REACT_APP_KEY}`;
console.log("clientId:", clientId);
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchImages();

  }, [photos]);


  //function for fetching images
  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientId}${urlQuery}`;
    }
    else { url = `${mainUrl}${clientId}${urlPage}`; }
    try {
      //Acces the data from api
      const response = await fetch(url);
      console.log("url", url);
      //Convert it into json format
      const data = await response.json();
      console.log("data", data);
      if (Array.isArray(data)) {
 //set it into the set photos function 
        setphotos((oldPhotos) => {
          if (query && page === 1) {
            return data.results;
          }
          else if (query) {
            return [...oldPhotos, ...data.results];
          }
          else {
            return [...oldPhotos, ...data];
          }


        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  //##This is for infinite scrolling 
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
    
      if ((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 1) {
        setPage((oldPage) => { return oldPage + 1; });
      }
    });
    return () => window.addEventListener("scroll", event);
  }, [page]);

//##Making card component and passing the data as a props
  return (
    <div className="container">
  <CardComponent url={photos} key={photos} />
    </div>
  );
}

export default App;
