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
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country +"&units=metric&appid="+library.key)
        .then(response => response.json())
        .then(data => {
            console.log(data)
                    //longitude and latitude for testing purposes
                    library.lon = data["city"]["coord"].lon
                    library.lat = data["city"]["coord"].lat
                    //For each day that needs to be displayed we loop over the array of 40 days and return the objects that we need
                    library.days.forEach((day, i)=>{
                        library.sixDayTemp.push(data["list"][i]["main"].temp) //This stores the average temperature in an array of 6 days
                        library.sixDayWeather.push(data["list"][i]["weather"][i].main) //This stores the named weather in an array of 6 days
                        library.sixDayIcon.push(data["list"][i]["weather"][i].icon) //This stores the icon name  in an array of 6 days
                        })
        })
        .catch(error=>{
            console.log(error) // Catches any errors regarding the fetch -> the fetch is a promise and requires a valid XML input
        })
}




//a22242314b0694ba3aa5480b6172d174
