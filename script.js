function getId(id) { return document.getElementById(id); }
function returnValue(id) { return getId(id).value; }
function resetValue(id) { getId(id).value = ""; }
var library = {
    city: "",
    country: "",
    lat: "",
    lon: ""
};
function formSubmit() {
    getInputFields();
}
function getInputFields() {
    library.city = returnValue("inputFieldCity");
    library.country = returnValue("inputFieldCountry");
    resetValue("inputFieldCity");
    resetValue("inputFieldCountry");
    getForecast();
}
function getForecast() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country + "&appid=a22242314b0694ba3aa5480b6172d174")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        library.lon = data["city"]["coord"].lon;
        library.lat = data["city"]["coord"].lat;
    });
}
