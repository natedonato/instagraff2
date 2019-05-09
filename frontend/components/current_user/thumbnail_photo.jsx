import React from 'react';


class ThumbnailPhoto extends React.Component {

    componentDidMount(){
        this.props.fetchPhotos();
    }


    render(){
        if (Object.keys(this.props.photos).length === 0){
            return(<h1> Loading </h1>)
        }
        let photos = Object.values(this.props.photos).filter(photo => photo.poster_id === this.props.id)

        return(<div className="thumbnails">
            {photos.map(photo => (
                <img src={`${photo.picUrl}`} key={`${photo.id}`}/>
            ))        
            }
            </div>
        )
    }
}



export default ThumbnailPhoto;    