import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';
import Util from './Util';
import PdfBuilder from './PdfBuilder';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pdf: "",
      name: "",
      address: "", 
      phone: "",
      email: "",
    }

    this.settings = {
      basicInfoFontSize: 10,
      basicInfoLineGap: 4,
      basicInfoXCoordLeft: 25,
      basicInfoXCoordRight: 165,
      basicInfoYCoordLeft: 40,
      basicInfoYCoordRight: 40,
      currentYLeft: 40,
      currentYRight: 40
    }


    this.pdf = null;

    this.userInfoChanged = this.userInfoChanged.bind(this);
    this.refreshPdf = this.refreshPdf.bind(this);
  }

  render() {
    return (
      <div className='app'>
        <div className="left">
        <PdfForm userInfoChanged={this.userInfoChanged} name={this.state.name} address={this.state.address} phone={this.state.phone} email={this.state.email}
        refreshPdf={this.refreshPdf}/>
        </div>
        <PdfPreview pdf={this.state.pdf}/>
      </div>
    );
  }


  refreshPdf(){
    const pdfBuilder = new PdfBuilder(this.settings);
    const pdf = pdfBuilder.createPdf(this.state);
    this.setState({
      pdf: pdf
    });
  }

  /**
   * Called whenever one of the user info fields are changed
   * @param  {object} event event click
   */
  userInfoChanged(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}


/**
 * Class that handles constructing the whole form for PDF creation
 */
class PdfForm extends Component{
  render(){
    return(
      <div>
        <UserInfoForm userInfoChanged={this.props.userInfoChanged} name={this.props.name} address={this.props.address} phone={this.props.phone} email={this.props.email}/>
        <button type="button">Add field</button>
        <button type="button" onClick={this.props.refreshPdf}>Refresh PDF</button>
      </div>
    )
  }
}

/**
 * Class for creating a "large" entry with header and description text
 */
class LargeFieldForm extends Component{
  render(){
  }
}

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
          <input type="text" name="name" className="default-text-input" value={this.props.name} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Address: 
          <input type="text" name="address" className="default-text-input" value={this.props.address} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Phone: 
          <input type="text" name="phone" className="default-text-input" value={this.props.phone} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Email: 
          <input type="email" name="email" className="default-text-input" value={this.props.email} onChange={this.props.userInfoChanged}/>
        </label>
      </form>
    );
  }
}

/**
 * Class that handles viewing the generated PDF file
 */
class PdfPreview extends Component{
  render(){
    return(
    <div className='pdf-preview'>
      <iframe className='pdf-frame' src={this.props.pdf} />
    </div>
    );
  }
}

export default App;
