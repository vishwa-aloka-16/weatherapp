let city = [
    [1248991,"Colombo",6.931940,79.847778],
    [1241622,"Kandy",7.295500,80.635597],
    [1228730,"Ratnapura",6.682780,80.399170],
    [1226260,"Trincomalee",8.571100,81.233498],
    [1237980,"Kurunegala",7.486300,80.362297],
    [1240372,"Kilinochchi",9.396100,80.398201],
    [1229901,"Polonnaruwa",7.933330,81.000000],
    [1223738,"Weligama",5.966670,80.416672],
    [1225018,"Vavuniya",8.751400,80.497101],
    [1229293,"Puttalam",8.036200,79.828300],
    [1232783,"NuwaraEliya",6.970780,80.782860],
    [1235846,"Matara",5.948510,80.535278],
    [1240622,"Kelaniya",6.955300,79.921997],
    [1241964,"Kalutara",6.583100,79.959297],
    [1242833,"Jaffna",9.668450,80.007423],
    [1246000,"Gampola",7.164300,80.569603],
    [1246294,"Galle",6.036700,80.217003],
    [1248749,"Dambulla",7.860000,80.651672],
    [1249145,"Chilaw",7.575830,79.795280],
    [1249931,"Beruwala",6.478800,79.982803],
    [1250161,"Batticaloa",7.710200,81.692398],
    [1250615,"Badulla",6.989500,81.055702],
    [1251081,"Anuradhapura",8.356470,80.417259],
    [1251459,"Ampara",7.283330,81.666672],
    [1251574,"Ambalangoda",6.235500,80.053802],
    [1234808,"Monaragala",6.871400,81.348701],
    [1246007,"Gampaha",7.089700,79.992500],
];
//HTML ELEMENTS
const weatherDay = document.getElementsByClassName("weatherDay");
const weatherTime = document.getElementsByClassName("weatherTime");
const watherDis = document.getElementsByClassName("watherDis");
const weatherDayPartContainer = document.getElementsByClassName("weatherDayPartContainer");
const cityName = document.getElementById('cityName');
const cityTemp = document.getElementById('cityTemp');
const cityvalue = document.getElementById("city");
const watherInfo = document.getElementsByClassName("weatherInfo");
const searchBtn =document.getElementById("search");


searchBtn.addEventListener('click',function () {
    let userCity = cityvalue.value;
    cityName.innerHTML = userCity;






//City Id Finder
let cityID =0;
let k=0
city.forEach(e => {
    e.forEach(c=>{
        if (c == userCity) {
            cityID = city[k][0];
            this.break;
        }
    });
    k++;
});


const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;  1
month = month < 10 ? '0' + month : month; 
const day = today.getDate();

const TodayDate = `${year}-${month}-${day}`;
console.log(TodayDate); 


//Functions 

function dayFinder(today,day) {
    if( today == day){
        return "Today";
    }else if(parseInt(day.slice(8, 10)) == parseInt(today.slice(8, 10))-1){
        return "Yesterday";
    }else if(parseInt(day.slice(8, 10)) == (parseInt(today.slice(8, 10))+1)){
        return "Tommorow";
    }
}
function timeFinder(time){
    let hrs = time.split(":")[0];

    if (0<=hrs && hrs<=9 ) {
        return "Morning"
    } else if(9<hrs && hrs<=14){
        return "Noon"
    }else if(14<hrs && hrs<=18){
        return "Evening"
    }else if(18<hrs && hrs<=24){
        return "Night"
    }
}

function backgroundColorSelector(weather) {
    if (weather == "Clouds") {
        return " #cccccc"
    } else if (weather == "Rain") {
        return "#c7e9ff"
    }else if (weather == "Clear") {
        return "#ffea80"
    }else if (weather == "Thunderstorm") {
        return "#999893"
    }else if (weather == "Drizzle") {
        return "#d4fbfc"
    }else if (weather == "Mist") {
        return "#f5fafa"
    }
}

//API RESPONCE
fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityID+'&appid=a901d4f6fafbf6ac750033d06f3acdbb')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
//API WORK

    let weatherDisplayOne = data.list[0].dt_txt.split(" ");
    let weatherDisplayTwo = data.list[3].dt_txt.split(" ");
    let weatherDisplayThree = data.list[5].dt_txt.split(" ");
    weatherDay[0].innerHTML= dayFinder(TodayDate,weatherDisplayOne[0]);
    weatherDay[1].innerHTML= dayFinder(TodayDate,weatherDisplayTwo[0]);
    weatherDay[2].innerHTML= dayFinder(TodayDate,weatherDisplayThree[0]);
    weatherTime[0].innerHTML= timeFinder(weatherDisplayOne[1]);
    weatherTime[1].innerHTML= timeFinder(weatherDisplayTwo[1]);
    weatherTime[2].innerHTML= timeFinder(weatherDisplayThree[1]);

    watherDis[0].innerHTML= data.list[0].weather[0].description;
    watherDis[1].innerHTML= data.list[3].weather[0].description;
    watherDis[2].innerHTML= data.list[5].weather[0].description;

    weatherDayPartContainer[0].style.backgroundColor = backgroundColorSelector(data.list[0].weather[0].main);
    weatherDayPartContainer[1].style.backgroundColor = backgroundColorSelector(data.list[3].weather[0].main);
    weatherDayPartContainer[2].style.backgroundColor = backgroundColorSelector(data.list[5].weather[0].main);
    cityTemp.innerHTML= (data.list[0].main.temp-273).toFixed(0)+"°C";

    // watherInfo[0].innerHTML.innerHTML = 
    watherInfo[0].innerHTML= "Temperature(Feels Like):&nbsp;&nbsp;"+ data.list[0].main.feels_like +"K";
    watherInfo[1].innerHTML= "Max Temperature:&nbsp;&nbsp;"+ data.list[0].main.temp_max+"K";
    watherInfo[2].innerHTML= "Min Temperature:&nbsp;&nbsp;"+ data.list[0].main.temp_min +"K";
    watherInfo[3].innerHTML= "Humidity:&nbsp;&nbsp;"+ data.list[0].main.humidity ;
    watherInfo[4].innerHTML= "Pressure:&nbsp;&nbsp;"+ data.list[0].main.pressure;
    watherInfo[5].innerHTML= "Visibility:&nbsp;&nbsp;"+ data.list[0].wind.speed ;
    watherInfo[6].innerHTML= "Wind:&nbsp;&nbsp;"+ data.list[0].visibility;
    watherInfo[7].innerHTML= "Rain:&nbsp;&nbsp;"+ data.list[0].rain["3h"] ;








});

});