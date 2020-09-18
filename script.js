// -- Key is the correct one, TS ignore for obs --
var _0x39eb = ['a22242314b0694ba3aa5480b6172d174', '3b57edc1f996dddcab25', '6b4f7d4420caea5b058e7a4ee75467c1'];
(function (_0x6a5584, _0x39ebd3) { var _0x40c8c6 = function (_0xee52d2) { while (--_0xee52d2) {
    _0x6a5584['push'](_0x6a5584['shift']());
} }; _0x40c8c6(++_0x39ebd3); }(_0x39eb, 0x7f));
var _0x40c8 = function (_0x6a5584, _0x39ebd3) { _0x6a5584 = _0x6a5584 - 0x0; var _0x40c8c6 = _0x39eb[_0x6a5584]; return _0x40c8c6; }; // @ts-ignore
var obscure = { 'key': _0x40c8('0x1'), 'hery': _0x40c8('0x2'), 'keyreal': _0x40c8('0x0') };
// -- Classes to shorthand DOM manipulation --
function getId(id) { return document.getElementById(id); }
function returnValue(id) { return getId(id).value; }
function resetValue(id) { getId(id).value = ""; }
// -- Days contains the set number of days we want to display as it's length value, for more days add another 0, beware that the API supports 7 days MAX --
var days = [0, 0, 0, 0, 0, 0];
// -- OOP Constructor to simplify, reset and preset the data in typescript --
var library = {
    currentTemp: 0,
    currentWeather: "",
    currentIcon: "",
    sixDayTemp: [],
    sixDayWeather: [],
    sixDayIcon: [],
    daysOfThisWeek: []
};
function formSubmit() {
    getInputFields();
}
function getInputFields() {
    var city = returnValue("inputFieldCity"); // Local input values for the 2 boxes on the HTML
    var country = returnValue("inputFieldCountry"); //
    getForecast(city, country); //Calls the API function, will setup a class later
    getImage(city);
    resetValue("inputFieldCity"); //Resetting the input fields: shorthand -> check top of page
    resetValue("inputFieldCountry"); //Resetting the input fields: shorthand -> check top of page
}
// Fetching the data from the API
function getForecast(city, country) {
    // The &units turns the returned api to degrees C instead of degrees F
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&units=metric&appid=" + obscure.hery) // we only fetch this to get the longitude and latitude for the all call fetch
        .then(function (response) { return response.json(); }) // parsing the response into a temporary data structure
        .then(function (data) {
        //longitude and latitude for testing purposes
        var longitude = data["city"]["coord"].lon; //i decided to localize these variables
        var latitude = data["city"]["coord"].lat; // <-!
        getOneCall(longitude, latitude); // passing the variables on to the next function to keep the global scope clean
    })["catch"](function (error) {
        console.log(error); // Catches any errors regarding the fetch -> the fetch is a promise and requires a valid XML input
    });
}
function getOneCall(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=metric&appid=" + obscure.hery) // fetches weather data with precalculated averages
        .then(function (response) { return response.json(); })
        .then(function (data) {
        library.sixDayTemp.push(Math.floor(data["current"].temp)); //Pushing the current temperature to the start of the output array
        library.sixDayWeather.push(data["current"]["weather"][0].description); //Pushing the current weather to the start of the output array
        library.sixDayIcon.push(data["current"]["weather"][0].icon); //Pushing the current icon to the start of the output array
        days.forEach(function (day, i) {
            library.sixDayTemp.push(Math.floor(data["daily"][i]["temp"].day)); //This stores the average temperature in an array of 6 days + current
            library.sixDayWeather.push(data["daily"][i]["weather"][0].description); //This stores the named weather in an array of 6 days + current
            library.sixDayIcon.push(data["daily"][i]["weather"][0].icon); //This stores the icon name  in an array of 6 days + current
        });
        var daysOfWeekName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; //Days of the week to be used to turn day number to string with capital
        var dt = new Date(); // Get the current date and time
        var dayName = dt.getDay(); //Get day of week as a number
        for (var i = 0; i < days.length; i++) { //Loop over the amount of days needed for display: 6 in this case: 5 + today
            library.daysOfThisWeek.push(daysOfWeekName[dayName - 1]); //Compare the index to the days of
            dayName === 7 ? dayName = 1 : dayName++; //if the number of the day exceeds 7 it loops back to index 1:monday
        }
        outputForm();
        drawChart();
    })["catch"](function (error) {
        console.log(error); // Catches any errors regarding the second fetch -> the fetch is a promise and requires a valid XML input
    });
}
function getImage(city) {
    fetch("https://api.unsplash.com/photos/random?query=" + city + ",city&client_id=W-gpszfB92DY_MRzZH_iXOkG1dCl_yte33wiDhD6Jvk")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        var urls = data.urls;
        var regular = urls.regular;
        setBackground(regular);
    });
}
function outputForm() {
    getId("current").innerHTML = "Current" + "<div>" + "<img src='img/" + library.sixDayIcon[0].toString() + ".png'></div>";
    getId("today").innerHTML = "Today" + "<div>" + "<img src='img/" + library.sixDayIcon[1].toString() + ".png'></div>";
    getId("one").innerHTML = "Tomorrow" + "<div>" + "<img src='img/" + library.sixDayIcon[2].toString() + ".png'></div>";
    getId("two").innerHTML = library.daysOfThisWeek[2] + "<div>" + "<img src='img/" + library.sixDayIcon[3].toString() + ".png'></div>";
    getId("three").innerHTML = library.daysOfThisWeek[3] + "<div>" + "<img src='img/" + library.sixDayIcon[4].toString() + ".png'></div>";
    getId("four").innerHTML = library.daysOfThisWeek[4] + "<div>" + "<img src='img/" + library.sixDayIcon[5].toString() + ".png'></div>";
    getId("five").innerHTML = library.daysOfThisWeek[5] + "<div>" + "<img src='img/" + library.sixDayIcon[6].toString() + ".png'></div>";
    getId("currentData").innerHTML = "<div>" + library.sixDayTemp[0].toString() + "°C</div>";
    getId("todayData").innerHTML = "<div>" + library.sixDayTemp[1].toString() + "°C</div>";
    getId("oneData").innerHTML = "<div>" + library.sixDayTemp[2].toString() + "°C</div>";
    getId("twoData").innerHTML = "<div>" + library.sixDayTemp[3].toString() + "°C</div>";
    getId("threeData").innerHTML = "<div>" + library.sixDayTemp[4].toString() + "°C</div>";
    getId("fourData").innerHTML = "<div>" + library.sixDayTemp[5].toString() + "°C</div>";
    getId("fiveData").innerHTML = "<div>" + library.sixDayTemp[6].toString() + "°C</div>";
}
function setBackground(thisUrl) {
    document.body.style.backgroundImage = "url('" + thisUrl + "')";
}
function drawChart() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Day', 'Temperature', 'Today'],
            ['Current', library.sixDayTemp[0], library.sixDayTemp[0]],
            ['Today', library.sixDayTemp[1], library.sixDayTemp[0]],
            ['Tomorrow', library.sixDayTemp[2], library.sixDayTemp[0]],
            [library.daysOfThisWeek[2], library.sixDayTemp[3], library.sixDayTemp[0]],
            [library.daysOfThisWeek[3], library.sixDayTemp[4], library.sixDayTemp[0]],
            [library.daysOfThisWeek[4], library.sixDayTemp[5], library.sixDayTemp[0]],
            [library.daysOfThisWeek[5], library.sixDayTemp[6], library.sixDayTemp[0]]
        ]);
        var options = {
            title: 'Temperature',
            curveType: 'function',
            legend: { position: 'bottom' }
        };
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
    }
}
