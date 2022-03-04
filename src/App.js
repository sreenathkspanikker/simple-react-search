import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [allData, setAlldata] = useState([])

  useEffect(() => {
    let isLoad = true

    if (isLoad) {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(value => {
          setData(value) 
          setAlldata(value)
        });
    }

    return () => {
      isLoad = false
    }
  }, [])
  
  const handleChange = e => {
    const value = e.target.value
    setData(value.length > 0 ? data.filter(i => i.name.common.toLowerCase().match(value)) : allData)
  }

  return (
    <div className="App">
      <h1>Sample search</h1>
      <input type="search" placeholder='Search by keyword' onChange={e=> handleChange(e)}/>
      <ul>
        {data?.map((items, idx) => {
          return (
            <li key={idx}>{items.name.common},</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
