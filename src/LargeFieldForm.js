import React, { Component } from 'react';


/**
 * Class for creating a "large" entry with header and description text
 */
class LargeFieldForm extends Component{
  render(){
    if(this.props.showMainHeader){
      return(
      <form className="large-field">
        <button className="delete-large-field-button" onClick={this.props.deleteLargeField}>X</button>
        <label>
          Main header:
          <input type="text" name="mainHeader" className="default-text-input"/>
        </label>
        <label>
          Field header:
          <input type="text" name="largeFieldHeader" onChange={this.props.largeFieldChanged} value={this.props.largeFieldHeader} className="default-text-input"/>
        </label>
        <label>
          Field description:
          <textarea name="largeFieldText" onChange={this.props.largeFieldChanged} value={this.props.largeFieldText} className="default-text-input"/>
        </label>
      </form>
      );
    }
    else{
      return(
      <form className="large-field">
        <button className="delete-large-field-button" onClick={this.props.deleteLargeField}>X</button>
        <label>
          Field header:
          <input type="text" name="largeFieldHeader" onChange={this.props.largeFieldChanged} value={this.props.largeFieldHeader} className="default-text-input"/>
        </label>
        <label>
          Field description:
          <textarea name="largeFieldText" onChange={this.props.largeFieldChanged} value={this.props.largeFieldText} className="default-text-input"/>
        </label>
      </form>
      );
    }
  }
}

export default LargeFieldForm;