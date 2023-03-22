import React, { useEffect, useState } from "react"
import "./style.css"
import { createApi } from "unsplash-js"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Form from "./components/Form"
import Photos from "./components/Photos"


function App() {

const [inputText, setInputText] = useState('cat')

const [data, setPhotosResponse] = useState(null)

//利用unsplash-js和access key製作api
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "Xu5_Tajs73tZCnaSASdJFO9FW4-6U9uHAkXLa9QP4aE"
});

//頁面載入時馬上搜尋cat並顯示在頁面上
const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <div>
      <LazyLoadImage className="img" src={urls.thumb} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </div>
  )
}

//頁面載入時馬上搜尋cat並顯示在頁面上
useEffect(() => {
  api.search
  .getPhotos({ query: "cat", stats: true, orientation: "landscape", perPage: 10 })
  .then(result => {
    setPhotosResponse(result);
  })
  .catch(() => {
    console.log("something went wrong!");
  });
}, []);


return (
  <div className="App">
  <div className="container">
  <header>
          Photo Search
  </header>
  <Form 
    inputText={inputText}
    setInputText={setInputText}
    api={api}
    data={data}
    setPhotosResponse={setPhotosResponse}
    PhotoComp={PhotoComp}
  />
  <Photos 
      data={data}
      PhotoComp={PhotoComp}
      setPhotosResponse={setPhotosResponse}
  />
  </div>
  </div>
)
}

export default App
