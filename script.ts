//Key is the correct one, TS ignore for obs
let _0x39eb=['a22242314b0694ba3aa5480b6172d174','3b57edc1f996dddcab25','6b4f7d4420caea5b058e7a4ee75467c1'];(function(_0x6a5584,_0x39ebd3){const _0x40c8c6=function(_0xee52d2){while(--_0xee52d2){_0x6a5584['push'](_0x6a5584['shift']());}};_0x40c8c6(++_0x39ebd3);}(_0x39eb,0x7f));const _0x40c8=function(_0x6a5584,_0x39ebd3){_0x6a5584=_0x6a5584-0x0;let _0x40c8c6=_0x39eb[_0x6a5584];return _0x40c8c6;};// @ts-ignore
let obscure={'key':_0x40c8('0x1'),'hery':_0x40c8('0x2'),'keyreal':_0x40c8('0x0')};
// Classes to shorthand DOM manipulation
function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}
//Days contains the set number of days we want to display as it's length value
let days:number[] = [0,0,0,0,0,0]
// OOP Constructor to simplify, reset and preset the data
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




// Function that gets called by the inline HTML to prevent default reload
function formSubmit(){
    getInputFields();
}
// Pulling the input values from the DOM
function getInputFields(){
    let city: string = returnValue("inputFieldCity");
    let country: string = returnValue("inputFieldCountry");
    //Calls the API function, will setup a class later
    getForecast(city, country);
    //Resetting the input fields
    resetValue("inputFieldCity")
    resetValue("inputFieldCountry")

}
// Fetching the data from the API
function getForecast(city, country) {
    // The &units turns the returned api to degrees C instead of degrees F
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country +"&units=metric&appid="+obscure.hery)
        .then(response => response.json())
        .then(data => {
                    //longitude and latitude for testing purposes
                    let longitude = data["city"]["coord"].lon
                    let latitude = data["city"]["coord"].lat
                    getOneCall(longitude, latitude)
        })
        .catch(error=>{
            console.log(error) // Catches any errors regarding the fetch -> the fetch is a promise and requires a valid XML input
        })
}
function getOneCall(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=metric&appid=" + obscure.hery)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            library.sixDayTemp.push(data["current"].temp)//Pushing the current temperature to the start of the output array
            library.sixDayWeather.push(data["current"]["weather"][0].description)//Pushing the current weather to the start of the output array
            library.sixDayIcon.push(data["current"]["weather"][0].icon)//Pushing the current icon to the start of the output array
            days.forEach((day, i) => {//For each day that needs to be displayed we loop over the array inside the API call and return the objects that we need
                library.sixDayTemp.push(data["daily"][i]["temp"].day)//This stores the average temperature in an array of 6 days + current
                library.sixDayWeather.push(data["daily"][i]["weather"][0].description)//This stores the named weather in an array of 6 days + current
                library.sixDayIcon.push(data["daily"][i]["weather"][0].icon)//This stores the icon name  in an array of 6 days + current
            })
            let daysOfWeekName: string[] =["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
            let dt = new Date()// Get the current date and time
            let dayName= dt.getDay()//Get day of week as a number
            for(let i = 0; i < days.length; i++){//Loop over the amount of days needed for display: 6 in this case: 5 + today
                library.daysOfThisWeek.push(daysOfWeekName[dayName-1]);//Compare the index to the days of
                dayName === 7? dayName=1: dayName ++
            }
            outputForm()
        })
        .catch(error=>{
            console.log(error) // Catches any errors regarding the second fetch -> the fetch is a promise and requires a valid XML input
        })
}
function outputForm(){
    getId("current").innerHTML = "Current"
    getId("today").innerHTML = "Today"
    getId("one").innerHTML = "Tomorrow"
    getId("two").innerHTML = library.daysOfThisWeek[2]
    getId("three").innerHTML = library.daysOfThisWeek[3]
    getId("four").innerHTML = library.daysOfThisWeek[4]
    getId("five").innerHTML = library.daysOfThisWeek[5]
    getId("currentData").innerHTML = library.sixDayTemp[0].toString()
    getId("todayData").innerHTML = library.sixDayTemp[1].toString()
    getId("oneData").innerHTML = library.sixDayTemp[2].toString()
    getId("twoData").innerHTML = library.sixDayTemp[3].toString()
    getId("threeData").innerHTML = library.sixDayTemp[4].toString()
    getId("fourData").innerHTML = library.sixDayTemp[5].toString()
    getId("fiveData").innerHTML = library.sixDayTemp[6].toString()
    getId("currentWeather").innerHTML = library.sixDayWeather[0]
    getId("todayWeather").innerHTML = library.sixDayWeather[1]
    getId("oneWeather").innerHTML = library.sixDayWeather[2]
    getId("twoWeather").innerHTML = library.sixDayWeather[3]
    getId("threeWeather").innerHTML = library.sixDayWeather[4]
    getId("fourWeather").innerHTML = library.sixDayWeather[5]
    getId("fiveWeather").innerHTML = library.sixDayWeather[6]

}
