function getId(id){ return document.getElementById(id)}
function returnValue(id){ return (<HTMLInputElement>getId(id)).value}
function resetValue(id){(<HTMLInputElement>getId(id)).value = ""}

let library : {
    city: string,
    country: string,
    lat: string,
    lon: string,
}={
    city: "",
    country: "",
    lat: "",
    lon: ""
}

function formSubmit(){
    getInputFields();

}
function getInputFields(){
    library.city = returnValue("inputFieldCity");
    library.country = returnValue("inputFieldCountry");
    resetValue("inputFieldCity")
    resetValue("inputFieldCountry")
    getForecast();
}

function getForecast() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country +"&appid=a22242314b0694ba3aa5480b6172d174")
        .then(response => response.json())
        .then(data => {
                    library.lon = data["city"]["coord"].lon
                    library.lat = data["city"]["coord"].lat

        })
}