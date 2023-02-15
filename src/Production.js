import React,{useEffect, useRef, useState} from "react";
import './css/Production.css';
import fireDB from './Firebase';

const Production = ({dbdata}) =>{

    const [selectedDate, setSelectedDate] = useState();
    const [Product, setProduct] = useState();

    const handleOnChange = (e) =>{
        setProduct(e.target.value);
    }

    let date = [];

    //collecting unique date
    for(let id in dbdata){
        date[id] = dbdata[id].date;   
    }
    let filteredDate=[...new Set(date)];
    //collecting average light intensity
    //average values of lux

    let averageLux = [];
    var count = 0.0;
    var luxValue = 0.0;
    let time = [];

    for(let i=0; i<filteredDate.length; i++){

	    for(let id in dbdata){
		if(dbdata[id].date === filteredDate[i]){
			count++;
			luxValue = parseFloat(dbdata[id].lux) + luxValue;
            time[i]=dbdata[id].time;
	        }
	    }
	    averageLux.push(luxValue/count);
	    count = 0;
	    luxValue = 0
    }
    //converting time into duration
    let j=0;
    let duration = [];
    let hour=[],min=[]
    for(let i=0;i<filteredDate.length;i++){
        for(let id in dbdata){
            if(dbdata[id].date === filteredDate[i]){
                time[j]=dbdata[id].time;
                if(time[j]){
                    time[j] = time[j].replace(/:/g,".").slice(0,5);
                    hour[j] = parseInt(time[j].slice(0,2))
                    min[j] = parseInt(time[j].slice(3,5))
                }
                j++;
            }
        }
        if(min[j-1]<min[0]){
            let catchHour = hour[j-1]-hour[0];
            let catchMin = (min[j-1]+60)-min[0];
            duration.push(catchHour.toString()+"."+catchMin.toString());
        }
        else{
            let catchHour = hour[j-1]-hour[0];
            let catchMin = (min[j-1])-min[0];
            duration.push(catchHour.toString()+"."+catchMin.toString());
        }
        j=0  
    }
    //setting data
    const handleOnClick = () =>{

        const myData = fireDB.database().ref("/mData/");
    
            let arrData =[]
        myData.on("value", (snapshot) => {
        const data = snapshot.val();
        for(let id in data){
          arrData.push(data[id]);
        }
      });

        let holdIndex = 0;
        for(let i=0;i<filteredDate.length;i++){
            if(selectedDate == filteredDate[i])
            {
                holdIndex = i;
            }
        }
        let j=0;
        for(let id in arrData){
            if(arrData[id].date === filteredDate[holdIndex]){
                j++;
            }
        }
        if(j==0){
            let dataToPush = {
                averageLux: averageLux[holdIndex],
                duration: duration[holdIndex],
                date: filteredDate[holdIndex],
                production: Product
            }
            if(Product && selectedDate){
                myData.push(dataToPush);
                alert('Successfull');
                setSelectedDate(null);
                setProduct(null);
            }
            else{
                alert("Fill the required things!")
            }
        }
        else{
            alert("Data allready exists");
        }
        j=0;
    }

    
    return(
        <>
        <h1>Egg Production Submission</h1>
        <div className="productionContainer">
        <select value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}>
                <option selected disabled>Select Date</option>
                {filteredDate.map(e=><option>{e}</option>)}
        </select>
        <input type="text" onChange={handleOnChange} placeholder="Input production"></input>
        <button onClick={handleOnClick}>Submit</button>
        </div>
        </>
    );
}
export default Production;