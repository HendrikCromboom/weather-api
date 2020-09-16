function getId(id) { return document.getElementById(id); }
function returnValue(id) { return getId(id).value; }
function resetValue(id) { getId(id).value = ""; }
var library = {
    city: "",
    country: "",
    key: "",
    lat: "",
    lon: "",
    today: [],
    days: [0, 0, 0, 0, 0, 0]
};
function formSubmit() {
    getInputFields();
}
function getInputFields() {
    library.city = returnValue("inputFieldCity");
    library.country = returnValue("inputFieldCountry");
    library.key = returnValue("inputFieldKey");
    resetValue("inputFieldCity");
    resetValue("inputFieldCountry");
    getForecast();
}
function getForecast() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country + "&appid=" + library.key)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        library.lon = data["city"]["coord"].lon;
        library.lat = data["city"]["coord"].lat;
        library.days.forEach(function (day, i) {
            library.today.push(data["list"][i]["main"].temp);
        });
    });
}
/*function getOneCall() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + library.lat + "&lon=" + library.lon + "&appid=a22242314b0694ba3aa5480b6172d174")
        .then(response => response.json())
        .then(data => {
        })
}*/ 
