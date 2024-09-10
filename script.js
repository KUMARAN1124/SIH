const weatherInfo = document.getElementById('weather-info');
const fruitsContainer = document.getElementById('fruits');
const vegetablesContainer = document.getElementById('vegetables');
const flowersContainer = document.getElementById('flowers');
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');

const APIKey = '1822eedca103e9202cccb7f7d6b00fb7';

// Expanded crop database
const cropDatabase = {
    fruits: [
        { name: 'Apple', image: 'apples.jpg', climate: 'cool' },
        { name: 'Orange', image: 'orange.jpg', climate: 'warm' },
        { name: 'Banana', image: 'Banana.jpg', climate: 'tropical' },
        { name: 'Strawberry', image: 'Strawberry.jpg', climate: 'moderate' },
        { name: 'Mango', image: 'Mango.jpg', climate: 'tropical' },
        { name: 'Grape', image: 'grapes.jpg', climate: 'warm' },
        { name: 'Pineapple', image: 'Pineapple.jpg', climate: 'tropical' },
        { name: 'Blueberry', image: 'BlueBerry.jpg', climate: 'cool' },
        { name: 'Peach', image: 'Peach.jpg', climate: 'warm' },
        { name: 'Kiwi', image: 'Kiwi.jpg', climate: 'moderate' },
        { name: 'Watermelon', image: 'watermelon.jpg', climate: 'warm' },
        { name: 'Pomegranate', image: 'Pomegranate.jpg', climate: 'warm' },
        { name: 'Lemon', image: 'Lemon.jpg', climate: 'warm' },
        { name: 'Cherry', image: 'Cherry.jpg', climate: 'cool' },
        { name: 'Papaya', image: 'papaya.jpg', climate: 'tropical' },
        { name: 'Avocado', image: 'avocado.jpg', climate: 'tropical' },
        { name: 'Plum', image: 'plum.jpg', climate: 'moderate' },
        { name: 'Raspberry', image: 'rasberry.jpg', climate: 'cool' },
        { name: 'Coconut', image: 'coconut.jpg', climate: 'tropical' },
        { name: 'Fig', image: 'fig.jpg', climate: 'warm' }
    ],
    vegetables: [
        { name: 'Tomato', image: 'Tomato.jpg', climate: 'warm' },
        { name: 'Carrot', image: 'Carrot.jpg', climate: 'cool' },
        { name: 'Lettuce', image: 'Lettuce.jpg', climate: 'moderate' },
        { name: 'Pepper', image: 'Pepper.jpeg', climate: 'warm' },
        { name: 'Broccoli', image: 'Broccoli.jpg', climate: 'cool' },
        { name: 'Eggplant', image: 'Eggplant.jpg', climate: 'warm' },
        { name: 'Cucumber', image: 'cucumber.jpg', climate: 'warm' },
        { name: 'Spinach', image: 'Spinach.jpg', climate: 'cool' },
        { name: 'Potato', image: 'potatoes.jpg', climate: 'cool' },
        { name: 'Onion', image: 'onion.jpg', climate: 'moderate' },
        { name: 'Garlic', image: 'garlic.jpg', climate: 'moderate' },
        { name: 'Cabbage', image: 'Cabbage.jpg', climate: 'cool' },
        { name: 'Cauliflower', image: 'Cauliflower.jpg', climate: 'cool' },
        { name: 'Peas', image: 'Peas.jpg', climate: 'cool' },
        { name: 'Beans', image: 'Beans.jpg', climate: 'warm' },
        { name: 'Squash', image: 'squash.jpg', climate: 'warm' },
        { name: 'Zucchini', image: 'Zuchinni.jpg', climate: 'warm' },
        { name: 'Radish', image: 'radish.jpeg', climate: 'cool' },
        { name: 'Kale', image: 'kale.jpg', climate: 'cool' },
        { name: 'Asparagus', image: 'Asparagus.jpg', climate: 'moderate' }
    ],
    flowers: [
        { name: 'Rose', image: 'Rose.jpg', climate: 'moderate' },
        { name: 'Sunflower', image: 'Sunflower.jpg', climate: 'warm' },
        { name: 'Tulip', image: 'tulip.jpg', climate: 'cool' },
        { name: 'Orchid', image: 'orchid.jpg', climate: 'tropical' },
        { name: 'Daisy', image: 'daisy.jpg', climate: 'moderate' },
        { name: 'Lavender', image: 'Lavender.jpg', climate: 'warm' },
        { name: 'Lily', image: 'lily.jpg', climate: 'moderate' },
        { name: 'Marigold', image: 'marigold.jpg', climate: 'warm' },
        { name: 'Peony', image: 'peony.jpg', climate: 'cool' },
        { name: 'Hibiscus', image: 'hibiscus.jpg', climate: 'tropical' },
        { name: 'Chrysanthemum', image: 'chrysanthemum.jpg', climate: 'moderate' },
        { name: 'Dahlia', image: 'dahlia.jpg', climate: 'moderate' },
        { name: 'Carnation', image: 'carnation.jpg', climate: 'cool' },
        { name: 'Geranium', image: 'Geranium.jpg', climate: 'warm' },
        { name: 'Jasmine', image: 'jasmine.jpg', climate: 'warm' },
        { name: 'Iris', image: 'Iris.jpg', climate: 'cool' },
        { name: 'Azalea', image: 'azalea.jpg', climate: 'moderate' },
        { name: 'Pansy', image: 'pansy.jpg', climate: 'cool' },
        { name: 'Begonia', image: 'Begonia.jpg', climate: 'warm' },
        { name: 'Camellia', image: 'Camellias.jpg', climate: 'moderate' }
    ]
};

const getClimate = (temperature) => {
    if (temperature < 10) return 'cool';
    if (temperature < 20) return 'moderate';
    if (temperature < 30) return 'warm';
    return 'tropical';
};

const suggestCrops = (climate) => {
    const suggestions = {};
    for (const [category, crops] of Object.entries(cropDatabase)) {
        suggestions[category] = crops.filter(crop => crop.climate === climate || crop.climate === 'moderate');
    }
    return suggestions;
};

const displayCrops = (suggestions) => {
    for (const [category, crops] of Object.entries(suggestions)) {
        const container = document.getElementById(category);
        container.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
        const cropGrid = document.createElement('div');
        cropGrid.classList.add('crop-grid');
        
        crops.forEach(crop => {
            const cropCard = document.createElement('div');
            cropCard.classList.add('crop-card');
            cropCard.innerHTML = `
                <img src="${crop.image}" alt="${crop.name}" class="crop-image">
                <h3>${crop.name}</h3>
            `;
            cropGrid.appendChild(cropCard);
        });
        
        container.appendChild(cropGrid);
    }
};

searchBtn.addEventListener('click', () => {
    const city = locationInput.value;

    if (city === '') return;

    weatherInfo.innerHTML = 'Loading...';
    fruitsContainer.innerHTML = '';
    vegetablesContainer.innerHTML = '';
    flowersContainer.innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;

            weatherInfo.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature.toFixed(1)}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Conditions: ${description}</p>
            `;

            const climate = getClimate(temperature);
            const suggestions = suggestCrops(climate);
            displayCrops(suggestions);
        })
        .catch(error => {
            weatherInfo.innerHTML = `Error: ${error.message}. Please try again.`;
        });
});