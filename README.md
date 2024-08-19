# US States Facts API

This is a Node.js REST API that provides information about U.S. states, including fun facts, capitals, nicknames, population, and admission dates. The API uses Express and MongoDB to manage data, with additional functionalities such as filtering, adding, updating, and deleting state facts.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get All States](#get-all-states)
  - [Get a Single State](#get-a-single-state)
  - [Get a Random Fun Fact](#get-a-random-fun-fact)
  - [Add New Fun Facts](#add-new-fun-facts)
  - [Update a Fun Fact](#update-a-fun-fact)
  - [Delete a Fun Fact](#delete-a-fun-fact)
  - [Get State Capital](#get-state-capital)
  - [Get State Nickname](#get-state-nickname)
  - [Get State Population](#get-state-population)
  - [Get State Admission Date](#get-state-admission-date)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

To get started with the API, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/yourusername/us-states-api.git
cd us-states-api
npm install

Environment Variables
Create a .env file in the root directory with the following variables: 
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/states?retryWrites=true&w=majority
PORT=3000

Usage
Running the Server
To start the server in development mode with Nodemon:
npm run dev

To start the server in production mode:
npm start


API Endpoints:

Get All States
Endpoint: /api/states
Method: GET
Query Parameters:
contig=true/false (Optional) - Filter by contiguous states.

Get a Single State
Endpoint: /api/states/:code
Method: GET

Get a Random Fun Fact
Endpoint: /api/states/:code/funfact
Method: GET

Add New Fun Facts
Endpoint: /api/states/:code/funfacts
Method: POST
Request Body:
{
  "funfacts": ["Fact 1", "Fact 2"]
}

Update a Fun Fact
Endpoint: /api/states/:code/funfacts
Method: PATCH
Request Body:
{
  "index": 1,
  "funfact": "Updated Fun Fact"
}

Delete a Fun Fact
Endpoint: /api/states/:code/funfacts
Method: DELETE
Request Body:
{
  "index": 1
}

Get State Capital
Endpoint: /api/states/:code/capital
Method: GET

Get State Nickname
Endpoint: /api/states/:code/nickname
Method: GET

Get State Population
Endpoint: /api/states/:code/population
Method: GET

Get State Admission Date
Endpoint: /api/states/:code/admission
Method: GET


File Structure:

├── config/
│   ├── allowedOrigins.js
│   ├── corsOptions.js
│   ├── dbConn.js
├── controllers/
│   ├── statesController.js
├── middleware/
│   ├── credentials.js
│   ├── errorHandler.js
│   ├── logEvents.js
│   ├── verifyState.js
├── models/
│   ├── State.js
│   ├── statesData.json
├── node_modules/
├── public/
│   ├── css/
│   ├── img/
│   ├── text/
├── routes/
│   ├── root.js
│   ├── api/
│   │   ├── states.js
├── views/
│   ├── 404.html
│   ├── index.html
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js


Technologies Used
Node.js
Express
MongoDB
Mongoose
Nodemon (for development)
dotenv (for environment variables)