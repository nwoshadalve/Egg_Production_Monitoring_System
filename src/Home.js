import React, {useState} from 'react';
import './css/home.css';

const Home = ({dbdata}) =>{   

    return(
        <div>
            <header>
                <div className="textContainer">
                    <h1 className="headerTitle">To find the optimum light intensity to get maximum egg production in poultry industry</h1>
                </div>
            </header>
        <div className="dataContainer">
            <h1 className="realtimeDBTitle">Collection of Data</h1>
            <div className="showData">
                <div className="headingView">
                    <p className="dateHeading">Date</p>
                    <p><span className="timeHeading">Time</span></p>
                    <p className="luxHeading">Light Intensity</p>
                </div>
                {dbdata ? dbdata.map((sData)=>
                <div className="dataView">
                    <p className="">{sData.date}</p>
                    <p className="">{sData.time}</p>
                    <p className="">{sData.lux}lux</p>
                </div>
                ) : ''}
                
            </div>
        </div>
        </div>
    );
}

export default Home;