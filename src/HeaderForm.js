import React, { Component } from 'react';

class HeaderForm extends Component{
    render(){
        return(
            <form className="large-field">
                <label>
                    Main header:
                    <input type="text" name="largeFieldHeader" className="default-text-input"/>
                </label>
            </form>
        );
    }
}

export default HeaderForm;