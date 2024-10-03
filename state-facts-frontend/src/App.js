import React, { useState } from 'react';
import StateFacts from './components/stateFacts';



const App = () => {
    const [stateCode, setStateCode] = useState('FL');

    return (
        <div>
            <h1>State Facts</h1>
            <input
                type="text"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                placeholder="Enter State Code (e.g., FL)"
            />
            <StateFacts stateCode={stateCode} />
        </div>
    );
};

export default App;
