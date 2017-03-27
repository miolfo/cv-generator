import React, { Component } from 'react';
import LargeFieldForm from './LargeFieldForm';
import UserInfoForm from './UserInfoForm';

/**
 * Class that handles constructing the whole form for PDF creation
 */
class PdfForm extends Component{
  render(){
    let prevMainHeader = "";
    if(this.props.largeFields.length > 0){
        prevMainHeader = this.props.largeFields[0].mainHeader;
    }

    const largeFields = this.props.largeFields.map((obj, index) => {
        let showMainHeader = false;
        if((prevMainHeader !== obj.mainHeader || index === 0) && prevMainHeader !== "" && prevMainHeader !== undefined){
            showMainHeader = true;
        }
        return <LargeFieldForm 
        key={index} 
        showMainHeader={showMainHeader}
        deleteLargeField={this.props.deleteLargeField.bind(null, index)} 
        largeFieldChanged={this.props.largeFieldChanged.bind(null, index)}
        largeFieldHeader={this.props.largeFields[index].header}
        largeFieldText={this.props.largeFields[index].text}/>
    });

    return(
      <div>
        <UserInfoForm userInfoChanged={this.props.userInfoChanged} userName={this.props.userName}
        userAddress={this.props.userAddress} userPhone={this.props.userPhone} userEmail={this.props.userEmail}/>
        <div className="large-fields">
          {largeFields}
        </div>
        <button type="button" onClick={this.props.addLargeField}>Add field</button>
        <button type="button">Add header</button>
        <button type="button" onClick={this.props.refreshPdf}>Refresh PDF</button>
      </div>
    )
  }
}

export default PdfForm;