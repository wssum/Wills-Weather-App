let weatherData=[];
//fetches raw data from site
async function getWeatherData(){
    let rawData = await fetch("https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FToronto");
    let data = await rawData.json();
    data = data.daily;
    return data;
}

//tells whether the day is sunny, rainy or snowy based on the precipitation and overall
function dryOrWetDay(day){
    const overallTemp = day.maxTemp + day.minTemp;

    if(day.precipitations > 2.5)
    {
       return (overallTemp >= 1)?"Heavy-Rain":"Heavy-Snow";
    }else if(day.precipitations <= 2.5 && day.precipitations >= 1.2){
        return (overallTemp >= 1)?"Light-Rain":"Light-Snow";
    }
    return "Sunny";
}


//takes a date and gets the day as a name
function getDayName(date){
    const day = new Date(date);
    return day.toLocaleDateString('en-US', { weekday: 'long' });
}

//creates forecasts based on the index of the argument and using the data from getWeatherData
async function makeForecast(slot){
    let weatherData = await getWeatherData();
    let forecast = {
      dayName: getDayName(weatherData.time[slot]),
      date: weatherData.time[slot],//this actually gets the date
      maxTemp: weatherData.temperature_2m_max[slot],
      minTemp: weatherData.temperature_2m_min[slot],
      //this gets the precipitation which will be used to see if its rainy,sunny and etc
      precipitations: weatherData.precipitation_sum[slot]
    };
  
   return forecast;
  }

  async function populateWeatherData() {
    if(weatherData.length === 0){
        let promises = [];
        for(let i = 0; i < 7; i++){
            promises.push(makeForecast(i));
        }
    
        return Promise.all(promises).then(forecasts => {
            forecasts.forEach(data => {
                let precip = dryOrWetDay(data);
                data.precip = precip;
                data.img = '/'+precip+".jpg";
                weatherData.push(data);
            });
            return weatherData;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }

    return Promise.resolve(weatherData);
    
}

module.exports = {populateWeatherData,makeForecast,getDayName,
    makeForecast,dryOrWetDay,getWeatherData,weatherData};
