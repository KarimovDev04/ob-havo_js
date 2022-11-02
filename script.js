const api = {
	key: "a495372ad4db4dc7653a8a2c355d60e5",
	baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
	if (e.keyCode == 13) {
		getResults(searchBox.value);
		console.log(searchBox.value);
	}
}

function getResults(query) {
	fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then((weather) => {
			return weather.json();
		})
		.then(displayResults);
}

function displayResults(weather) {
	console.log(weather);
	let city = document.querySelector(".location .city");
	city.innerHTML = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector(".location .date");
	date.innerHTML = dateBuilder(now);

	let temp = document.querySelector(".temp");
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

	let weatherEl = document.querySelector(".weather");
	let iconurl =
		"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
	weatherEl.innerHTML = "<img src=" + iconurl + ">";

	let hilow = document.querySelector(".hi-low");
	hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
		weather.main.temp_max
	)}°C`;
}

function dateBuilder(k) {
	let months = [
		"Yanvar",
		"Fevral",
		"Mart",
		"Aprel",
		"May",
		"Iyun",
		"Iyul",
		"Avgust",
		"Sentyabr",
		"Oktiyabr",
		"Noyabr",
		"Dekabr",
	];
	let days = [
		"Yakshanba",
		"Dushanba",
		"Seshanba",
		"Chorshanba",
		"Payshanba",
		"Juma",
		"Shanba",
	];

	let day = days[k.getDay()];
	let date = k.getDate();
	let month = months[k.getMonth()];
	let year = k.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
