//Key is the correct one, TS ignore for obs
let _0x39eb=['a22242314b0694ba3aa5480b6172d174','3b57edc1f996dddcab25','6b4f7d4420caea5b058e7a4ee75467c1'];(function(_0x6a5584,_0x39ebd3){const _0x40c8c6=function(_0xee52d2){while(--_0xee52d2){_0x6a5584['push'](_0x6a5584['shift']());}};_0x40c8c6(++_0x39ebd3);}(_0x39eb,0x7f));const _0x40c8=function(_0x6a5584,_0x39ebd3){_0x6a5584=_0x6a5584-0x0;let _0x40c8c6=_0x39eb[_0x6a5584];return _0x40c8c6;};// @ts-ignore
let obscure={'key':_0x40c8('0x1'),'hery':_0x40c8('0x2'),'keyreal':_0x40c8('0x0')};
// Classes to shorthand DOM manipulation
function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}
// OOP Constructor to simplify, reset and preset the data
const library : {
    city: string,
    country: string,
    currentTemp: number,
    currentWeather: string,
    currentIcon: string,
    sixDayTemp: number[],
    sixDayWeather: string[],
    sixDayIcon: string[],
    days: number[],
    daysOfWeekName: string[],
    daysOfThisWeek: string[]

}={
    city: "",
    country: "",
    currentTemp: 0,
    currentWeather: "",
    currentIcon: "",
    sixDayTemp: [],
    sixDayWeather: [],
    sixDayIcon: [],
    days: [0,0,0,0,0,0],
    daysOfWeekName:["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
    daysOfThisWeek:[]
}




// Function that gets called by the inline HTML to prevent default reload
function formSubmit(){
    getInputFields();
}
// Pulling the input values from the DOM
function getInputFields(){
    let city = returnValue("inputFieldCity");
    let country = returnValue("inputFieldCountry");
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
            library.currentTemp = data["current"].temp
            library.days.forEach((day, i) => {//For each day that needs to be displayed we loop over the array of 40 days and return the objects that we need
                library.sixDayTemp.push(data["daily"][i]["temp"].day)//This stores the average temperature in an array of 6 days
                library.sixDayWeather.push(data["daily"][i]["weather"][0].description)//This stores the named weather in an array of 6 days
                library.sixDayIcon.push(data["daily"][i]["weather"][0].icon)//This stores the icon name  in an array of 6 days
                console.log(library.sixDayIcon)

            })

        })
        .catch(error=>{
            console.log(error) // Catches any errors regarding the second fetch -> the fetch is a promise and requires a valid XML input
        })
}
let dt = new Date()
let dayName= dt.getDay()
for(let i = 0; i < library.days.length; i++){
    library.daysOfThisWeek.push(library.daysOfWeekName[dayName-1]);
    dayName === 7? dayName=1: dayName ++
}
