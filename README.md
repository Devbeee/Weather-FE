# My Front End G-Weather-Forecast

Welcome to **My Front End G-Weather-Forecast**! This is a ReactJS application designed to show the weather information and the weather forecast. Follow the instructions below to get started with the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Settings](#settings)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/)
- [git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Devbeee/G-Weather-Forecast-FE.git
    ```

2. Navigate into the project directory:

    ```bash
    cd G-Weather-Forecast-FE
    ```

3. Install the project dependencies:

    Using npm:

    ```bash
    npm install
    ```

    Or using Yarn:

    ```bash
    yarn install
    ```

## Settings

At the root of the project, create a .env file and add the following environment variables
```
REACT_APP_BASE_URL = http://api.weatherapi.com/v1
REACT_APP_SERVER_URL = your_server_url/api/v1
REACT_APP_API_KEY = your_weatherapi_key
```
- Replace your_server_url with your actual server URL.
- Replace your_weatherapi_key with the API key from [WeatherAPI](https://www.weatherapi.com).

## Running the Project

To start the development server and run the project locally, use the following command:

Using npm:

```bash
npm start
```

## Deployment

The website is deployed with Vercel: [G-Weather-Forecast](https://g-weather-forecast-fe-nine.vercel.app/) 
