import React, { Component } from 'react'

export default class Input extends Component {

    render() {
        const {labelText, inputType, inputName, inputValue, inputClass, placeholder, postLabelText, postLabelClass, minValue, maxValue, handleOnChange} = this.props;

        return (
            <div>
                {labelText && <label>{labelText}</label>}
                <input type={inputType} name={inputName} value={inputValue} className={inputClass} min={minValue} max={maxValue} onChange={handleOnChange} placeholder={placeholder} />
                {postLabelText && <label className={postLabelClass}>{postLabelText}</label>}
            </div>
        )
    }
}
