var library = {
    city: "",
    country: ""
};
function getForecast() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + library.city + "," + library.country + "&appid=a22242314b0694ba3aa5480b6172d174")
        .then(function (response) { return response.json(); })
        .then(function (data) {
    });
}
