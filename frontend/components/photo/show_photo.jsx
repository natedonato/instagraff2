import React from 'react';
import { Link } from 'react-router-dom';
import PhotoFormContainer from './photo_form_container';

class ShowPhoto extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        this.props.fetchPhoto(this.props.id);
    }

    render() {
        if (this.props.photo === undefined){
            return(
            <h1> LOADING</h1> 
            )
        }
        return (
            <div>
                <div>

                    <img className="profilePic" src={`${this.props.user.picUrl}`} alt="" />
                    {this.props.user.username}
                </div>
                <img className="postPic" src={`${this.props.photo.picUrl}`} alt="" />
            </div>
        );
    }
};


export default ShowPhoto;    