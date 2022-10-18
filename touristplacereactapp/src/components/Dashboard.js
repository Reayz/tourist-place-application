import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import PlaceList from './PlaceList'

export default class Dashboard extends Component {

    state = {
        needRedirection: false,
        filterText: ''
    }

    handleClick = (e) => {
        this.setState({
            ...this.state,
            needRedirection: true
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            filterText: value
        })
    }

    render() {
        return (
            <div className='Dashboard'>
                {this.state.needRedirection && <Navigate to="/newplace"/>}

                <Input inputType="text" inputValue={this.state.filterText} inputClass="SearchBox" handleOnChange={this.handleChange} placeholder="Enter name to search" />

                <PlaceList filterText={this.state.filterText} />

                <Button buttonClass="CreateBtn" buttonType="button" buttonText="Create New Tourist Place" handleOnClick={this.handleClick} />
            </div>
        )
    }
}
