import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        const typedValue = event.target.value;
        setValue(typedValue);
    };

    useEffect(() => {
        if (value.length > 0) {
            fetch("https://dummyjson.com/products")
                .then((response) => response.json())
                .then((responseData) => {
                    setResults([]);
                    let searchQuery = value.toLowerCase();
                    if (responseData) {
                        for (let item of responseData.products) {
                            let product = item.title.toLowerCase();
                            if (product.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                                setResults((prevResults) => [...prevResults, product]);
                            }
                        }
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setResults([]);
        }
    }, [value]);

    return (
        <div className="App">
            <h1>Please Enter Search Terms</h1>
            <input className="form-input" value={value} onChange={handleChange} />
            <div className="searchBack">
                {results.length
                    ? results.map((item) => (
                          <div key={item} className="searchEntry">
                              {item}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}

export default App;
