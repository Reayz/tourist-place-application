import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllPlaces, deletePlace } from '../redux/actions/placesAction';
import Button from './Button';
import { Navigate } from 'react-router-dom'

class PlaceList extends Component {

    state = {
        updatePlace: false,
        updateUrl: '',
        filterText: '',
    }

    componentDidMount(){
        if(this.props.places.length<=0){
            this.props.getAllPlaces();
        }
    }

    componentDidUpdate(){
        if(this.props.filterText === this.state.filterText) return;
        this.setState({
            ...this.state,
            filterText: this.props.filterText,
        })
    }

    handleUpdate= (id) => {
        this.setState({
            ...this.state,
            updatePlace: true,
            updateUrl: ('/newplace/'+id)
        })
    }

    handleDelete = (id) => {
        if(this.props.deletePlace){
            this.props.deletePlace(id);
        }
    }

    render() {
        const {isLoading, places, error} = this.props;

        let placeList = places;
        if(this.state.filterText !== '') {
            placeList = places.filter(place => place.name.toLowerCase().includes(this.state.filterText.toLowerCase())>0);
        }

        return (
            <div className="PlaceList">
                {this.state.updatePlace && <Navigate to={this.state.updateUrl} />}

                {isLoading && <h3 className='LoadingText'>Places are loading...<br /> <br />Please be patient.</h3>}

                {error && <h3>{error.message}</h3>}

                <table className='PlacesTable'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Rating</td>
                            <td>Type</td>
                            <td>Picture</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        { placeList.length>0 &&
                            placeList.map((place) => ( 
                                <tr key = { place.placeID } >
                                    <td>{ place.name }</td>
                                    <td>{ place.address }</td>
                                    <td>{ place.rating }</td>
                                    <td>{ place.type }</td>
                                    <td>
                                        <img className='PlaceImage' src={ place.picture } alt='Pictures' />
                                    </td>
                                    <td>
                                        <Button buttonType="button" buttonText="Update" handleOnClick={this.handleUpdate.bind(this, place.placeID)} buttonClass="UpdateBtn" />
                                        <Button buttonType="button" buttonText="Delete" handleOnClick={this.handleDelete.bind(this, place.placeID)} buttonClass="DeleteBtn" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {    
        isLoading: state.isLoading,
        places: state.places,
        error: state.error,
    };
}

export default connect(mapStateToProps, { getAllPlaces, deletePlace })(PlaceList);
