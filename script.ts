// -- Key is the correct one, TS ignore for obs --
let _0x39eb=['a22242314b0694ba3aa5480b6172d174','3b57edc1f996dddcab25','6b4f7d4420caea5b058e7a4ee75467c1'];(function(_0x6a5584,_0x39ebd3){const _0x40c8c6=function(_0xee52d2){while(--_0xee52d2){_0x6a5584['push'](_0x6a5584['shift']());}};_0x40c8c6(++_0x39ebd3);}(_0x39eb,0x7f));const _0x40c8=function(_0x6a5584,_0x39ebd3){_0x6a5584=_0x6a5584-0x0;let _0x40c8c6=_0x39eb[_0x6a5584];return _0x40c8c6;};// @ts-ignore
let obscure={'key':_0x40c8('0x1'),'hery':_0x40c8('0x2'),'keyreal':_0x40c8('0x0')};
// -- Classes to shorthand DOM manipulation --
function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}
// -- Days contains the set number of days we want to display as it's length value, for more days add another 0, beware that the API supports 7 days MAX --
let days:number[] = [0,0,0,0,0,0]
// -- OOP Constructor to simplify, reset and preset the data in typescript --
const library : {
    currentTemp: number,
    currentWeather: string,
    currentIcon: string,
    sixDayTemp: number[],
    sixDayWeather: string[],
    sixDayIcon: string[],
    daysOfThisWeek: string[]
}={
    currentTemp: 0,
    currentWeather: "",
    currentIcon: "",
    sixDayTemp: [],
    sixDayWeather: [],
    sixDayIcon: [],
    daysOfThisWeek:[]
}





function formSubmit(){// Function that gets called by the inline HTML to prevent default reload
    resetArrays()
    getInputFields();
}//End of auto call from DOM
function resetArrays(){//We have to reset the arrays, otherwise we will keep pushing new data on top of the old one since these arrays are in a globalized constructor/object
    library.sixDayTemp=[]
    library.sixDayWeather=[]
    library.sixDayIcon=[]
    library.daysOfThisWeek=[]
}//End of reset
function getInputFields(){// Pulling the input values from the DOM
    let city: string = returnValue("inputFieldCity");// Local input values for the 2 boxes on the HTML
    let country: string = returnValue("inputFieldCountry");//
    getForecast(city, country);//Calls the API function, will setup a class later
    getImage(city);
    resetValue("inputFieldCity")//Resetting the input fields: shorthand -> check top of page
    resetValue("inputFieldCountry")//Resetting the input fields: shorthand -> check top of page

}//End of input gathering
// Fetching the data from the API
function getForecast(city, country) {
    // The &units turns the returned api to degrees C instead of degrees F
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country +"&units=metric&appid="+obscure.hery)// we only fetch this to get the longitude and latitude for the all call fetch
        .then(response => response.json())// parsing the response into a temporary data structure
        .then(data => { // <-!
                    //longitude and latitude for testing purposes
                    let longitude = data["city"]["coord"].lon //i decided to localize these variables
                    let latitude = data["city"]["coord"].lat   // <-!
                    getOneCall(longitude, latitude)// passing the variables on to the next function to keep the global scope clean
            document.title = "Weather API of " + city+", "+country
        })
        .catch(error=>{
            alert(error) // Catches any errors regarding the fetch -> the fetch is a promise and requires a valid XML input
        })
}
function getOneCall(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=metric&appid=" + obscure.hery)// fetches weather data with precalculated averages
        .then(response => response.json())
        .then(data => {
            library.sixDayTemp.push(Math.floor(data["current"].temp))//Pushing the current temperature to the start of the output array
            library.sixDayWeather.push(data["current"]["weather"][0].description)//Pushing the current weather to the start of the output array
            library.sixDayIcon.push(data["current"]["weather"][0].icon)//Pushing the current icon to the start of the output array
            days.forEach((day, i) => {//For each day that needs to be displayed we loop over the array inside the API call and return the objects that we need
                library.sixDayTemp.push(Math.floor(data["daily"][i]["temp"].day))//This stores the average temperature in an array of 6 days + current
                library.sixDayWeather.push(data["daily"][i]["weather"][0].description)//This stores the named weather in an array of 6 days + current
                library.sixDayIcon.push(data["daily"][i]["weather"][0].icon)//This stores the icon name  in an array of 6 days + current
            })
            let daysOfWeekName: string[] =["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]//Days of the week to be used to turn day number to string with capital
            let dt = new Date()// Get the current date and time
            let dayName= dt.getDay()//Get day of week as a number
            for(let i = 0; i < days.length; i++){//Loop over the amount of days needed for display: 6 in this case: 5 + today
                library.daysOfThisWeek.push(daysOfWeekName[dayName-1]);//Compare the index to the days of
                dayName === 7? dayName=1: dayName ++//if the number of the day exceeds 7 it loops back to index 1:monday
            }
            outputForm()
            drawCharts()
        })
        .catch(error=>{
            alert(error) // Catches any errors regarding the second fetch -> the fetch is a promise and requires a valid XML input
        })
}
function getImage(city){//Fetches an image for the background based on the name of the city getched from input
    fetch("https://api.unsplash.com/photos/random?query="+ city+ ",city&client_id=W-gpszfB92DY_MRzZH_iXOkG1dCl_yte33wiDhD6Jvk")
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data)
            let urls:any = data.urls//The URLS will contain an array of image URLS
            let regular:string = urls.regular//Regular will be a randomized popular image URL
            setBackground(regular)//Passing the url to a separate function to keep the code clean
                })
        .catch(error=>{
            alert(error) // Catches any errors regarding the image fetch -> the fetch is a promise and requires a valid XML input
        })
}
function outputForm(){//Output all the values to the DOM
    getId("divs").innerHTML= //We set the HTML structure to past to here
//Backticks are used to make using apostrophes easier, DONT comment in this section
        `<div class="wrapper">
        <div id="current">Welcome! Enjoy the weather!</div>
    <div id="currentWeather" class="weather"></div>
        <div id="currentData"></div>
        </div>
        <div class="wrapper">
    <div id="today"></div>
        <div id="todayWeather" class="weather"></div>
        <div id="todayData"></div>
        </div>
        <div class="wrapper">
    <div id="one"></div>
        <div id="oneWeather" class="weather"></div>
        <div id="oneData"></div>
        </div>
        <div class="wrapper">
    <div id="two"></div>
        <div id="twoWeather" class="weather"></div>
        <div id="twoData"></div>
        </div>
        <div class="wrapper">
    <div id="three"></div>
        <div id="threeWeather" class="weather"></div>
        <div id="threeData"></div>
        </div>
        <div class="wrapper">
    <div id="four"></div>
        <div id="fourWeather" class="weather"></div>
        <div id="fourData"></div>
        </div>
        <div class="wrapper">
    <div id="five"></div>
        <div id="fiveWeather" class="weather"></div>
        <div id="fiveData"></div>
        </div>`//End of pasted HTML structure, comments work AGAIN here
    getId("current").innerHTML = "Current"+"<div>" + "<img src='img/"+ library.sixDayIcon[0].toString() + ".png'></div>"
    getId("today").innerHTML = "Today"+"<div>" + "<img src='img/"+ library.sixDayIcon[1].toString() + ".png'></div>"
    getId("one").innerHTML = "Tomorrow"+"<div>" + "<img src='img/"+ library.sixDayIcon[2].toString() + ".png'></div>"
    getId("two").innerHTML = library.daysOfThisWeek[2]+"<div>" + "<img src='img/"+ library.sixDayIcon[3].toString() + ".png'></div>"
    getId("three").innerHTML = library.daysOfThisWeek[3]+"<div>" + "<img src='img/"+ library.sixDayIcon[4].toString() + ".png'></div>"
    getId("four").innerHTML = library.daysOfThisWeek[4]+"<div>" + "<img src='img/"+ library.sixDayIcon[5].toString() + ".png'></div>"
    getId("five").innerHTML = library.daysOfThisWeek[5]+"<div>" + "<img src='img/"+ library.sixDayIcon[6].toString() + ".png'></div>"
    getId("currentData").innerHTML = "<div>" + library.sixDayTemp[0].toString()+ "°C</div>"
    getId("todayData").innerHTML = "<div>" + library.sixDayTemp[1].toString()+ "°C</div>"
    getId("oneData").innerHTML = "<div>" + library.sixDayTemp[2].toString()+ "°C</div>"
    getId("twoData").innerHTML = "<div>" + library.sixDayTemp[3].toString()+ "°C</div>"
    getId("threeData").innerHTML = "<div>" + library.sixDayTemp[4].toString()+ "°C</div>"
    getId("fourData").innerHTML = "<div>" + library.sixDayTemp[5].toString()+ "°C</div>"
    getId("fiveData").innerHTML = "<div>" + library.sixDayTemp[6].toString()+ "°C</div>"

}//End of DOM insert, might want to loop over these if I find the time
function setBackground(thisUrl){
    document.body.style.backgroundImage = `url('${thisUrl}')`//The background is directly altered in the DOM
}
function drawCharts(){//We use google charts to display a line graph of the current and future temperatures
// @ts-ignore
    google.charts.load('current', {'packages':['corechart']});
// @ts-ignore
    google.charts.setOnLoadCallback(drawChart);

function drawChart() {//Google advises to use vars here since the script needs to globalize to a degree
    // @ts-ignore
    var data = google.visualization.arrayToDataTable([//The array displays all the fetched temperatures, the array has to have 3 cells on each line
        ['Day', 'Temperature', 'Today'],//
        ['Current',  library.sixDayTemp[0],     library.sixDayTemp[0]],//
        ['Today',  library.sixDayTemp[1],     library.sixDayTemp[0]],//
        ['Tomorrow',  library.sixDayTemp[2],     library.sixDayTemp[0]],//
        [library.daysOfThisWeek[2],  library.sixDayTemp[3],     library.sixDayTemp[0]],//
        [library.daysOfThisWeek[3],  library.sixDayTemp[4],     library.sixDayTemp[0]],//
        [library.daysOfThisWeek[4],  library.sixDayTemp[5],     library.sixDayTemp[0]],//
        [library.daysOfThisWeek[5],  library.sixDayTemp[6],     library.sixDayTemp[0]]//No comma here
    ]);//Nested array

    var options = {
        title: 'Temperature',//Title displayed in the chart
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    // @ts-ignore
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);//End of google charts script
}
}