import { FcSearch } from "react-icons/fc"

const Form = ({inputText, setInputText, PhotoComp, data, api, setPhotosResponse}) => {
  

    //顯示input的輸入值在頁面上
    const inputTextHandler = (event) => {
      setInputText(event.target.value)
    }
  
    //搜尋按鈕搜尋照片呼叫的方法
    const searchPhotos = (event) => {
      event.preventDefault()
      searchAction()
      setInputText('')
    }
  
    //實際搜尋照片的方法，傳入inputText並搜尋後設定到data
    const searchAction = () => {
      api.search
        .getPhotos({ query: inputText, stats: true, orientation: "landscape", perPage: 10 })
        .then(result => {
          setPhotosResponse(result);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }
  
 
  
    // console.log(body)

    return (
    <div>
          <form>
            <input type="text" value={inputText} onChange={inputTextHandler}/>
            <button type="submit" onClick={searchPhotos}>
              <FcSearch />
            </button>
          </form>
    </div>
    )
  }

export default Form  