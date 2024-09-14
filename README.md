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

3. Set up environment variables by creating a `.env` file with the following content:
    ```plaintext
    DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/states?retryWrites=true&w=majority
    PORT=3000
    ```

4. Make sure MongoDB is running and accessible from your application.

## Usage

- **Development mode:** Run the server with `nodemon` for automatic restarts:
    ```bash
    npm run dev
    ```
- **Production mode:** Start the server in production mode:
    ```bash
    npm start
    ```

## API Endpoints

- **Get All States:** `GET /api/states`
- **Get a Single State:** `GET /api/states/:code`
- **Get a Random Fun Fact:** `GET /api/states/:code/funfact`
- **Add New Fun Facts:** `POST /api/states/:code/funfact`
- **Update a Fun Fact:** `PATCH /api/states/:code/funfact`
- **Delete a Fun Fact:** `DELETE /api/states/:code/funfact`
- **Get State Capital:** `GET /api/states/:code/capital`
- **Get State Nickname:** `GET /api/states/:code/nickname`
- **Get State Population:** `GET /api/states/:code/population`
- **Get State Admission Date:** `GET /api/states/:code/admission`

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon (development)
- dotenv (for environment variables)
