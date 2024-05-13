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


let userCity = "Jaffna";
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
// console.log(userCity,"City Id is",cityID);
let tempData = document.getElementById('temp');
let cityData = document.getElementById('city');
let temp = 0; 
fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityID+'&appid=a901d4f6fafbf6ac750033d06f3acdbb')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
    temp = +(data.list[0].main.temp-273).toFixed(2)+"C";
    tempData.innerHTML = temp;
    cityData.innerHTML = data.city.name;
});

