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
      largeFields: []
    }

    this.settings = {
      basicInfoFontSize: 10,
      basicInfoLineGap: 4,
      basicInfoXCoordLeft: 25,
      basicInfoXCoordRight: 165,
      basicInfoYCoordLeft: 40,
      basicInfoYCoordRight: 40,
      currentYLeft: 40,
      currentYRight: 40,

      maxLineLength: 160,
      headerGap: 10,
      largeFieldGap: 20
    }


    this.pdf = null;

    this.userInfoChanged = this.userInfoChanged.bind(this);
    this.refreshPdf = this.refreshPdf.bind(this);
    this.addLargeField = this.addLargeField.bind(this);
    this.deleteLargeField = this.deleteLargeField.bind(this);
    this.largeFieldChanged = this.largeFieldChanged.bind(this);
  }

  render() {
    return (
      <div className='app'>
        <div className="left">
        <PdfForm 
          userInfoChanged={this.userInfoChanged} 
          refreshPdf={this.refreshPdf} 
          largeFields={this.state.largeFields} 
          addLargeField={this.addLargeField} 
          deleteLargeField={this.deleteLargeField}
          largeFieldChanged={this.largeFieldChanged}/>
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

  addLargeField(){
    const largeFields = this.state.largeFields;
    largeFields.push({
      header: "",
      text: ""
    });
    this.setState({
      largeFields: largeFields
    })
  }

  deleteLargeField(index, event){
    event.preventDefault();
    const largeFields = this.state.largeFields;
    largeFields.splice(index, 1);
    this.setState({
      largeFields: largeFields
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

  largeFieldChanged(index, event){
    event.preventDefault();
    const newValue = event.target.value;
    const largeFields = this.state.largeFields.slice();
    if(event.target.name==="largeFieldHeader") largeFields[index].header = newValue;
    else largeFields[index].text = newValue;
    this.setState({
      largeFields: largeFields
    });
  }
}


/**
 * Class that handles constructing the whole form for PDF creation
 */
class PdfForm extends Component{
  render(){
    const largeFields = this.props.largeFields.map((obj, index) => {
      return <LargeFieldForm 
      key={index} 
      deleteLargeField={this.props.deleteLargeField.bind(null, index)} 
      largeFieldChanged={this.props.largeFieldChanged.bind(null, index)}
      largeFieldHeader={this.props.largeFields[index].header}
      largeFieldText={this.props.largeFields[index].text}/>
    });
    return(
      <div>
        <UserInfoForm userInfoChanged={this.props.userInfoChanged}/>
        {largeFields}
        <button type="button" onClick={this.props.addLargeField}>Add field</button>
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
    return(
    <form>
      <label>
        Field header:
        <input type="text" name="largeFieldHeader" onChange={this.props.largeFieldChanged} value={this.props.largeFieldHeader} className="default-text-input"/>
      </label>
      <label>
        Field description:
        <textarea name="largeFieldText" onChange={this.props.largeFieldChanged} value={this.props.largeFieldText} className="default-text-input"/>
      </label>
      <button onClick={this.props.deleteLargeField}>X</button>
    </form>
    );
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
      <form>
        <label>
          Name: 
          <input type="text" name="name" className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Address: 
          <input type="text" name="address" className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Phone: 
          <input type="text" name="phone" className="default-text-input" onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Email: 
          <input type="email" name="email" className="default-text-input" onChange={this.props.userInfoChanged}/>
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
