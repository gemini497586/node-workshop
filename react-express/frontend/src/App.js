import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [stock, setStock] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/stock").then((res) => {
      setStock(res.data);
      // setMember(res);
    });
  }, []);
  return (
    <div className="App">
      <h1>這是測試</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">stock_id</th>
            <th scope="col">stock_name</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((value, input) => {
            return(
              <tr>            
                <th scope="row">#</th>
                <td>{value.stock_id}</td>
                <td>{value.stock_name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
