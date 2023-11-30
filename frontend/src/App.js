import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:2121');

function App() {
    
    const [data, setData] = useState({
        "lux": 0,
        "temperature": 0,
        "pressure": 0,
        "humidity": 0,
    });

    function manualUp() {
        socket.emit('pohyb', "hore");
    }
    function manualDown() {
        socket.emit('pohyb', "dole");
    }
    function workModeClick() {
        socket.emit('pohyb', "work");
    }
    function setSpeed(ryhlost) {
        socket.emit('rychlost', ryhlost);
    }

    socket.on('dataSenzor', (jsonData) => {
        setData(jsonData);
    });

  return (
    <div>
    <div className="box">
        <div className="box-border">

        
            <div className="manualne-ovladanie-box">
                <button className="maualne-ovladanie-button" onClick={()=>{manualUp()}}>UP</button>
                <button className="maualne-ovladanie-button" onClick={()=>{manualDown()}}>DOWN</button>    
            </div>
            
            
                <div className="rychlost-box">
            
                    <p>SPEED</p>
                    <div className="buttony">
                        <button onClick={()=>{setSpeed("jeden")}}>1X</button>
                        <button onClick={()=>{setSpeed("tri")}}>3X</button>
                        <button onClick={()=>{setSpeed("pat")}}>5X</button>  
                    </div>

                </div>
                <div className="senzory-info-box">
                    <div className="senzory-info-dva">
                        <p>TEMPERATURE : {Math.round(data.temperature)} *C</p>
                        <p>PRESSURE : {Math.round(data.pressure)} hPa</p>
                    </div>
                    <div className="senzory-info-dva">
                        <p>LIGHT : {Math.round(data.lux*100)/100} Lx</p>
                        <p>HUMIDITY : {Math.round(data.humidity)} %</p>
                    </div>
                    
                </div>
            



            <div className="work-func-box">
                <p>WORKING MODE</p>
                <button onClick={() => workModeClick()}>SET</button>
            </div>

        
        </div>
    </div>

    </div>
  );
}

export default App;
