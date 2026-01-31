const API_KEY = 'd2926f5336f1686f1d287dcd93243913';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => console.log(response));

    console.log(position);
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}