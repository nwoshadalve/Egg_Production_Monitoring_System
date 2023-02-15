import {React, useState} from "react";
import fireDB from "./Firebase";


let c = 0
const TestCase = () =>{
    const [count, setCount]= useState();
    const [lux,setLux]= useState();
    const [dur,setDur]= useState();
    const [pro, setPro] = useState()
    const handleOnChange1 = (e) =>{
        setLux(e.target.value);
    }
    const handleOnChange2 = (e) =>{
        setDur(e.target.value);
    }
    const handleOnChange3 = (e) =>{
        setPro(e.target.value);
    }
    const handleOnClick = () =>{
        const myData = fireDB.database().ref("/mData/");
        let data = {
            'averageLux': lux,
            'duration': dur,
            'production': pro
        }
        myData.push(data);
        setCount(c++)
    }


    return(
        <>
        <input type="text" onChange={handleOnChange1} placeholder="avgLux"></input>
        <input type="text" onChange={handleOnChange2} placeholder="Duration"></input>
        <input type="text" onChange={handleOnChange3} placeholder="production"></input>
        <button onClick={handleOnClick}>Submit</button>
        <p>{count}</p>
        </>
    );
}
export default TestCase;