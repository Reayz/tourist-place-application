import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPlace, updatePlace } from '../redux/actions/placesAction';
import Button from './Button';
import Input from './Input';

class AddEditPlace extends Component {

    constructor(props){
        super(props);

        this.state = {
            submitted: false,
            placeID: 0,
            name: '',
            address: '',
            rating: 1,
            type: '',
            fileValue: '',
            fileLabel: 'Please select a place picture'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let idStr = window.location.pathname.split('/')[2];
        let placeId = parseInt(idStr);
        if(!placeId) return;
        let place = this.props.places.filter(place => place.placeID === placeId)[0];

        this.setState({
            ...this.state,
            placeID: place.placeID,
            name: place.name,
            address: place.address,
            rating: place.rating,
            type: place.type,
            fileValue: place.picture,
            fileLabel: 'Picture has added'
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = '';

        if(target.type === 'file') {
            this.toBase64(target.files[0]).then((data) => {
                this.setState({
                    ...this.state,
                    fileValue: data,
                    fileLabel: 'Picture has added'
                })
            })
        }
        else {
            value = target.value;
            this.setState({
                ...this.state,
                [name]: value
            })
        }
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    handleReset = () => {
        this.setState({
            ...this.state,
            name: '',
            address: '',
            rating: 1,
            type: '',
            fileValue: '',
            fileLabel: 'Please select a place picture'
        })
    }

    async handleSubmit(e){
        e.preventDefault();

        if(!this.state.name) {
            alert('Please enter place name'); return;
        }
        if(!this.state.address) {
            alert('Please enter place address'); return;
        }
        if(!this.state.rating) {
            alert('Please enter place rating'); return;
        }
        if(!this.state.type) {
            alert('Please enter place type'); return;
        }
        if(!this.state.fileValue){
            alert('Please enter place picture'); return;
        }

        const body = {
            "placeID": this.state.placeID,
            "name": this.state.name,
            "address": this.state.address,
            "rating": parseInt(this.state.rating),
            "type": this.state.type,
            "picture": this.state.fileValue
        }
        
        if(this.state.placeID===0){
            this.props.addPlace(body).then(() => {
                this.setState({submitted: true})
            });
        }
        else{
            this.props.updatePlace(body).then(() => {
                this.setState({submitted: true})
            });
        }      
    }

    render() {
        const {name, address, rating, type} = this.state;

        return (
            <div className='NewPlace'>
                {this.state.submitted && <Navigate to="/dashboard"/>}

                {this.props.isLoading && <h3 className='LoadingText'>Added place is saving to the server...<br /> <br />Please be patient.</h3>}

                {this.props.isLoading === false &&
                    <form onSubmit={this.handleSubmit}>
                        <div className='TitleDiv'>
                            <label className='Title'>Add a new Tourist Place</label>
                        </div>

                        <Input labelText="Name: " inputType="text" inputName="name" inputValue={name} handleOnChange={this.handleChange} />
                        <Input labelText="Address: " inputType="text" inputName="address" inputValue={address} handleOnChange={this.handleChange} />
                        <Input labelText="Rating: " inputType="number" inputName="rating" inputValue={rating} postLabelText="Range 1 to 5" postLabelClass="Range" minValue="1" maxValue="5" handleOnChange={this.handleChange} />
                        <Input labelText="Type: " inputType="text" inputName="type" inputValue={type} handleOnChange={this.handleChange} />
                        <Input labelText="Picture: " inputType="file" inputName="fileValue" postLabelText={this.state.fileLabel} postLabelClass="FileLabel" handleOnChange={this.handleChange} />

                        <div className='Buttons'>
                            <Button buttonType="submit" buttonText="Submit" />
                            <Button buttonType="reset" buttonText="Reset" handleOnClick={this.handleReset} />
                        </div>
                        
                        <div className='BackBtnDiv'>
                            <Link to="/dashboard" className='BackBtn'>Back to Tourist Place List</Link>
                        </div>
                    </form>
                }
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

export default connect(mapStateToProps, { addPlace, updatePlace })(AddEditPlace);
