/**Declare varible for date, firstDay and lastDay */
//get the first day and last day of the current month
var date = new Date(); //get the current date and time
var firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
var lastDay = new Date(date.getFullYear(), date.getMonth() + 4, 0);

/** use while loop to generate dates in the dropdown list with the next 3 months dates */
while (firstDay <= lastDay) {
    var option = document.createElement("option"); //<otpion></option>
    var text = document.createTextNode(firstDay.toLocaleDateString());//XX/XX/XXXX
    option.appendChild(text);//<otpion>XX/XX/XXXX</option>
    document.getElementById("myDropDown").appendChild(option);
    //<select id="myDropDown"><option>XX/XX/XXXX</option>..</select>
    firstDay.setDate(firstDay.getDate() + 1);
}
/**delcare an array to store all selected dates*/
var selectedDates = new Array(); //empty array


/**
 * define a function to display the selected dates and add the date into the list
 * */
function displayDate() {


    /**stroe the selected date in to array*/
    var selected = document.getElementById("myDropDown").value;
    selectedDates.push(new DatePrice(selected));

    /**display the total price of all selected dates*/
    var total = 0;
    for (var i = 0; i < selectedDates.length; i++) {
        total += selectedDates[i].p;
        
    }
    /**document.getElementById("demo0").innerHTML = "total price ";**/
    document.getElementById("demo").innerHTML = total;

    /** 
     *  sort out the order od date
     * @param {date} a - date A
     * @param {date}b - date B
     * @returns -1, 1 or 0
     * */
    selectedDates.sort(function (a, b) {
        let selectDateA = a.d;
        let selectDateB = b.d;
        if (selectDateA < selectDateB) {
            return -1;
        }
        if (selectDateA > selectDateB) {
            return 1;
        }
        return 0;
    });

    /**add the slected date to the second drop down*/
    document.getElementById("myDropDown2").innerHTML = "" //<select id="myDropDown2"</select> clear selection
    for (var i = 0; i < selectedDates.length; i++) {
        var option = document.createElement("option"); //<otpion></option>
        var text = document.createTextNode(selectedDates[i].d.toLocaleDateString());//XX/XX/XXXX
        option.appendChild(text);//<otpion>XX/XX/XXXX</option>
        document.getElementById("myDropDown2").appendChild(option);
    }
}
/**
 * This is to find the sorted date and remove it with binary search*/
function removeDate() {

    /**
     * To do a binary search of the date property
     * @param {string} value 
     * @param {number} list
     * @returns {number} position of date property
     */
    function binarySearch(value, list) {

        var match = value.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        let valueDate = new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]));

        let first = 0;    //left endpoint
        let last = list.length - 1;   //right endpoint
        let position = -1;
        let found = false;
        let middle;

        while (found === false && first <= last) {
            middle = Math.floor((first + last) / 2);
            if (list[middle].d.valueOf() == valueDate.valueOf()) {
                found = true;
                position = middle;
            } else if (list[middle].d.valueOf() > valueDate.valueOf()) {  //if in lower half
                last = middle - 1;
            } else {  //in in upper half
                first = middle + 1;
            }
        }
        return position;
    }

    var selectedRemove = document.getElementById("myDropDown2").value;
    let binaryPosition = binarySearch(selectedRemove, selectedDates);

    /**remove the date with For loop */
    for (var i = 0; i < selectedDates.length; i++) {

        if (selectedRemove == selectedDates[i].d.toLocaleDateString()) {
            //remove from second dropdown
            //var indexDropDown = document.getElementById("myDropDown2").selectedIndex;
            document.getElementById("myDropDown2").remove(binaryPosition);
            //update total
            var total = document.getElementById("demo").innerHTML;
            total -= selectedDates[i].p;
            //remove from array
            selectedDates.splice(i, 1);
        }
    }
    //update the total on demo
    document.getElementById("demo").innerHTML = total;

}




/**
 * define a class to store the bookingdate and booking price
 */
class DatePrice {
    /**
     * constructor to store date and get price
     * @constructor
     * @param {Date} d - a date added from the list
     */
    constructor(d) {//d - string booking date
        this.d = new Date(d);//this.d (booking date) - Date obj property
        this.p = this.getPrice(); // this.p (booking price) - a number property
    }
    /**
     * Get the value of price with selected date using if and else if statement
     * @param {Date} d - selected date
     * @returns {number} the price value
     */
    getPrice(d) {


        if (this.d.getMonth() === 0) {
            return 250;
        }
        else if (this.d.getMonth() >= 1 && this.d.getMonth() <= 4) {
            return 220;
        }
        else if (this.d.getMonth() >= 5 && this.d.getMonth() <= 7) {
            return 200;
        }
        else if (this.d.getMonth() >= 8 && this.d.getMonth() <= 10) {
            return 210
        }
        else if (this.d.getMonth() === 11 && this.d.getDate() <= 18) {
            return 210;
        }
        else if (this.d.getMonth() === 11 && this.d.getDate() > 18) {
            return 250;
        }


    }

}
