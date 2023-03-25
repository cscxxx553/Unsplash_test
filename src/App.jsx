import React, { useEffect, useState } from "react"
import "./style.css"
import { createApi } from "unsplash-js"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Form from "./components/Form"
import Photos from "./components/Photos"


function App() {

const [inputText, setInputText] = useState('cat')

const [data, setPhotosResponse] = useState(null)

// const Access_Key = import.meta.env.VITE_API_KEY

//利用unsplash-js和access key製作api
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: import.meta.env.VITE_API_KEY
});

// const getPhotos = async () => {
//   const res = await axios.get(`https://api.umsplash.com/search/photos?query=dog&client_id=${Access_Key}`)
//   console.log('res', res)
// }

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
  // getPhotos()
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
