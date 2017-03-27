import React, { Component } from 'react';


/**
 * Form that contains the personal details of the user
 */
class UserInfoForm extends Component{
  constructor(){
    super();
  }

  render(){
    return (
      <form className="user-info-form">
        <label>
          Name: 
          <input type="text" name="name" value={this.props.userName} className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Address: 
          <input type="text" name="address" value={this.props.userAddress} className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Phone: 
          <input type="text" name="phone" value={this.props.userPhone} className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Email: 
          <input type="text" name="email" value={this.props.userEmail} className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
      </form>
    );
  }
}

export default UserInfoForm;