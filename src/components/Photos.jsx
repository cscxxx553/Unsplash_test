//若data有值的話顯示返回的照片
const Photos = ({data, PhotoComp}) => {

       let body
    if (data === null) {
      body = (<div>Loading...</div>)
    } else if (data.errors) {
      body = (
        <div>
          <div>{data.errors[0]}</div>
          <div>PS: Make sure to set your access token!</div>
        </div>
      )
    } else {
      body = (
        <div className="grid-container">
            {data.response.results.map(photo => (
              <div key={photo.id} >
                <PhotoComp photo={photo} />
              </div>
            ))}
        </div>
      )
    }

    return(
        <div className="grid-container">
            {body}
        </div>
    )
}

export default Photos