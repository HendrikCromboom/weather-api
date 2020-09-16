//Key is the correct one
let _0x39eb=['a22242314b0694ba3aa5480b6172d174','3b57edc1f996dddcab25','6b4f7d4420caea5b058e7a4ee75467c1'];(function(_0x6a5584,_0x39ebd3){const _0x40c8c6=function(_0xee52d2){while(--_0xee52d2){_0x6a5584['push'](_0x6a5584['shift']());}};_0x40c8c6(++_0x39ebd3);}(_0x39eb,0x7f));const _0x40c8=function(_0x6a5584,_0x39ebd3){_0x6a5584=_0x6a5584-0x0;let _0x40c8c6=_0x39eb[_0x6a5584];return _0x40c8c6;};// @ts-ignore
let obscure={'key':_0x40c8('0x1'),'hery':_0x40c8('0x2'),'keyreal':_0x40c8('0x0')};
// Classes to shorthand DOM manipulation
function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}
// OOP Constructor to simplify, reset and preset the data
let library : {
    city: string,
    country: string,
    key: string,
    lat: string,
    lon: string,
    sixDayTemp: number[],
    weather: object[],
    sixDayWeather: string[],
    sixDayIcon: string[],
    days: number[]
}={
    city: "",
    country: "",
    key: "",
    lat: "",
    lon: "",
    sixDayTemp: [],
    weather: [],
    sixDayWeather: [],
    sixDayIcon: [],
    days: [0,0,0,0,0,0]
}
// Function that gets called by the inline HTML to prevent default reload
function formSubmit(){
    getInputFields();
}
// Pulling the input values from the DOM
function getInputFields(){
    library.city = returnValue("inputFieldCity");
    library.country = returnValue("inputFieldCountry");
    library.key = returnValue("inputFieldKey")
    //Resetting the input fields
    resetValue("inputFieldCity")
    resetValue("inputFieldCountry")
    //Calls the API function, will setup a class later
    getForecast();
}
// Fetching the data from the API
function getForecast() {
    // The &units turns the returned api to degrees C instead of degrees F
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country +"&units=metric&appid="+obscure.hery)
        .then(response => response.json())
        .then(data => {
            console.log(data)
                    //longitude and latitude for testing purposes
                    library.lon = data["city"]["coord"].lon
                    library.lat = data["city"]["coord"].lat
                    //For each day that needs to be displayed we loop over the array of 40 days and return the objects that we need
                    library.days.forEach((day, i)=>{
                        i.toString()
                        library.sixDayTemp.push(data["list"][i]["main"].temp) //This stores the average temperature in an array of 6 days
                        library.sixDayWeather.push(data["list"][i]["weather"][0].main) //This stores the named weather in an array of 6 days
                        console.log(library.sixDayWeather)
                        //library.sixDayIcon.push(data["list"][i.toString()]["weather"][i.toString()].icon) //This stores the icon name  in an array of 6 days

                        })
        })
        .catch(error=>{
            console.log(error) // Catches any errors regarding the fetch -> the fetch is a promise and requires a valid XML input
        })
}




//a22242314b0694ba3aa5480b6172d174
