import jsPDF from 'jspdf';
import Util from './Util';

class PdfBuilder{
    constructor(settings){
        this.settings = settings;
        //Create a clone of settings
        this.originalSettings = JSON.parse(JSON.stringify(settings));
        this.pdf = null;
    }

    /**
     * Create and return the pdf as string
     * @param  {object} data that contains the basic info fields,
     * as well as the info for larger fields in an array
     */
    createPdf(data){
        //Restore a clone of original settings
        this.settings = JSON.parse(JSON.stringify(this.originalSettings));
        this.settings.currentYLeft = this.settings.basicInfoYCoordLeft;
        this.settings.currentYRight = this.settings.basicInfoYCoordRight;
        this.pdf = new jsPDF();
        this.pdf.setFontType('bold');
        this.pdf.setFontSize(this.settings.basicInfoFontSize);
        this.addBasicInfoItemRight("CV");
        this.addBasicInfoItemLeft(data.name);

        this.pdf.setFontType('normal');
        this.addBasicInfoItemRight(Util.getDateString());
        this.addBasicInfoItemLeft(data.address);
        this.addBasicInfoItemLeft(data.phone);
        this.addBasicInfoItemLeft(data.email);
        this.pdf.line(this.settings.basicInfoXCoordLeft-10, this.settings.currentYLeft, this.settings.basicInfoXCoordRight+30, this.settings.currentYLeft);

        //After basic info is laid out, set currentYLeft to position of larger fields starting point
        this.settings.currentYLeft += this.settings.largeFieldGap;

        //Large fields
        data.largeFields.forEach((obj) => {
            this.addLargeInfoItem(obj);
        });
        console.log(this.settings.currentYLeft);

        const pdfStr = this.pdf.output('datauristring');
        return pdfStr;
    }

    /**
    * Add a text item to top left of the document
    * @param  {string} item
    */
    addBasicInfoItemLeft(item){
        this.pdf.text(item, this.settings.basicInfoXCoordLeft, this.settings.currentYLeft);
        this.settings.currentYLeft += this.settings.basicInfoLineGap;
    }
  
  
    /**
     * Add a text item to top right of the document
     * @param  {string} item
     */
    addBasicInfoItemRight(item){
        this.pdf.text(item, this.settings.basicInfoXCoordRight, this.settings.currentYRight);
        this.settings.currentYRight += this.settings.basicInfoLineGap;
    }
    /**
     * Add a larger entry with header and text
     * @param  {object} item object with header and text
     */
    addLargeInfoItem(item){
        //Check if a page break should happen
        //Split the larger text into multiple lines and increment currentYLeft as supposed
        const splitText = this.pdf.splitTextToSize(item.text, this.settings.maxLineLength);
        if((splitText.length * (this.pdf.getTextDimensions('Text').h / 2)) + this.settings.currentYLeft > 300){
            this.pdf.addPage();
            //If a page was added, reset the settings to original
            this.settings.currentYLeft = this.originalSettings.currentYLeft;
        }

        this.pdf.setFontType('bold');
        this.pdf.text(item.header, this.settings.basicInfoXCoordLeft, this.settings.currentYLeft);
        this.pdf.setFontType('normal');
        this.settings.currentYLeft += this.settings.headerGap;
        
        this.pdf.text(splitText, this.settings.basicInfoXCoordLeft, this.settings.currentYLeft);
        this.settings.currentYLeft += (splitText.length * (this.pdf.getTextDimensions('Text').h / 2));
    }
}

export default PdfBuilder;