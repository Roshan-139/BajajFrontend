import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Validate JSON
      JSON.parse(jsonInput);

      // Make API call
      const result = await axios.post('YOUR_API_ENDPOINT', JSON.parse(jsonInput));
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleDropdownChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedOptions(selected);
  };

  const filterResponse = () => {
    if (!response) return null;
    return response.data.filter(item => {
      if (selectedOptions.includes('Alphabets') && /[A-Za-z]/.test(item)) return true;
      if (selectedOptions.includes('Numbers') && /\d/.test(item)) return true;
      if (selectedOptions.includes('Highest alphabet') && item === Math.max(...item.split('').filter(char => /[A-Za-z]/.test(char))) ) return true;
      return false;
    });
  };

  return (
    <div>
      <h1>Roll Number</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
      <select multiple onChange={handleDropdownChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest alphabet">Highest alphabet</option>
      </select>
      <div>
        {filterResponse() && filterResponse().map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </div>
  );
}

export default App;
