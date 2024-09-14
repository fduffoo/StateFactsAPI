# US States Facts API

A Node.js REST API providing information about U.S. states, including fun facts, capitals, nicknames, population, and admission dates. Built with Express and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/fduffoo/Node.js-REST-API.git
    cd Node.js-REST-API
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file with:
    ```plaintext
    DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/states?retryWrites=true&w=majority
    PORT=3000
    ```

## Usage

- **Development mode:** `npm run dev`
- **Production mode:** `npm start`

## API Endpoints

- **Get All States:** `GET /api/states`
- **Get State Details:** `GET /api/states/:state`
- **Get a Single State:** `GET /api/states/:state`
- **Get a Random Fun Fact:** `GET /api/states/:state/funfact`
- **Add New Fun Facts:** `POST /api/states/:state/funfact`
- **Update a Fun Fact:** `PATCH /api/states/:state/funfact`
- **Delete a Fun Fact:** `DELETE /api/states/:state/funfact`
- **Get State Capital:** `GET /api/states/:state/capital`
- **Get State Nickname:** `GET /api/states/:state/nickname`
- **Get State Population:** `GET /api/states/:state/population`
- **Get State Admission Date:** `GET /api/states/:state/admission`

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon (development)
- dotenv (environment variables)
