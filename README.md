# US States Facts API

A Node.js REST API providing information about U.S. states, including fun facts, capitals, nicknames, population, and admission dates. Built with Express, MongoDB, and React.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/fduffoo/StateFactsAPI.git
    cd StateFactsAPI
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

### **Get All States:**  
`GET /api/states`  
Retrieves a list of all U.S. states.
![all_states](https://github.com/user-attachments/assets/f983a4c1-dd2b-4c28-8505-98c6c1617641)

### **Get a Single State:**  
`GET /api/states/:state`  
Retrieves detailed information about a specified state.
![single_state](https://github.com/user-attachments/assets/3d5be1dc-ae0c-4782-ac16-d46f408350a2)

### **Get State Details:**  
`GET /api/states/:state/details`  
Retrieves detailed information about the specified state, including population, admission date, capital, and more.

### **Get State Capital:**  
`GET /api/states/:state/capital`  
Returns the capital city of the specified state.

### **Get State Nickname:**  
`GET /api/states/:state/nickname`  
Returns the nickname of the specified state.

### **Get State Admission Date:**  
`GET /api/states/:state/admission`  
Returns the date the state was admitted to the union.

### **Get State Website:**  
`GET /api/states/:state/website`  
Returns the official website of the specified state.

### **Get State Flag URL:**  
`GET /api/states/:state/flag`  
Returns the URL of the state flag image.

### **Get State Social Media:**  
`GET /api/states/:state/socialmedia`  
Returns the social media links (Twitter and Facebook) of the specified state.

### **Get State Population:**  
`GET /api/states/:state/population`  
Returns the population of the specified state.
![state_pop](https://github.com/user-attachments/assets/f943c1a0-fe68-4159-ba1d-af3ffcb0d005)

### **Get a Random Fun Fact:**  
`GET /api/states/:state/funfact`  
Returns a random fun fact for the specified state.
![state_fun_fact](https://github.com/user-attachments/assets/203023e1-4e91-4483-a6e1-57f085a2f2e1)

### **Add New Fun Facts:**  
`POST /api/states/:state/funfact`  
Adds new fun facts for the specified state.
![post_fun_fact](https://github.com/user-attachments/assets/e5697238-7404-4994-bea6-232ff6881dc5)

### **Update a Fun Fact:**  
`PATCH /api/states/:state/funfact`  
Updates a fun fact for the specified state at a given index.

### **Delete a Fun Fact:**  
`DELETE /api/states/:state/funfact`  
Deletes a fun fact for the specified state.

## Technologies Used

- Node.js
- Express
- React
- MongoDB
- Mongoose
- Jest
- Supertest
- Nodemon (development)
- dotenv (environment variables)

