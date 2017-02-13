const Util = {
    getDateString: function(){
        const date = new Date();
        const dateStr = this.leftPadDateZero(date.getDate().toString()) + "." + this.leftPadDateZero(date.getMonth().toString()) + "." + date.getFullYear();
        return dateStr; 
    },

    leftPadDateZero: function(item){
        if(item.length === 2) return item;
        else if(item.length === 1) return "0" + item;
        else throw "Invalid date for padding!";
    }
}

export default Util;