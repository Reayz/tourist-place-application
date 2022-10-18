import React, { Component } from 'react'

export default class Button extends Component {

    render() {
        const {buttonType, buttonText, buttonClass, handleOnClick} = this.props;

        return (
            <button className={buttonClass} type={buttonType} onClick={handleOnClick}>{buttonText}</button>
        )
    }
}
