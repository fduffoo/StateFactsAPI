import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateFacts = () => {
    const [stateCode, setStateCode] = useState('');
    const [funfact, setFunfact] = useState('');
    const [message, setMessage] = useState('');
    const [stateDetails, setStateDetails] = useState(null);

    const fetchStateDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/states/${stateCode}`);
            setStateDetails(response.data);
        } catch (error) {
            setMessage('Error fetching state details.');
        }
    };

    const addFunFact = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/states/${stateCode}/funfacts`, { funfacts: [funfact] });
            setMessage('Fun fact added successfully!');
            setFunfact('');
        } catch (error) {
            setMessage('Could not add fun fact.');
        }
    };

    return (
        <div>
            <h2>Fun Facts for {stateCode.toUpperCase()}</h2>
            <input 
                type="text" 
                value={stateCode} 
                onChange={(e) => setStateCode(e.target.value)} 
                placeholder="Enter State Code (e.g., FL)"
            />
            <button onClick={fetchStateDetails}>Get State Details</button>
            
            {stateDetails && (
                <div>
                    <p>Capital: {stateDetails.capital}</p>
                    <p>Nickname: {stateDetails.nickname}</p>
                    <p>Population: {stateDetails.population}</p>
                    <p>Admission Date: {stateDetails.admission_date}</p>
                </div>
            )}

            <input 
                type="text" 
                value={funfact} 
                onChange={(e) => setFunfact(e.target.value)} 
                placeholder="Add Fun Fact"
            />
            <button onClick={addFunFact}>Add Fun Fact</button>
            <p>{message}</p>
        </div>
    );
};

export default StateFacts;
