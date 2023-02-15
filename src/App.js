import React,{useState, useEffect} from 'react';
import BarChart from './BarChart';
import fireDB from './Firebase';
import Home from './Home';
import LineChart from './LineChart';
import Pie from './Pie';
import Production from './Production';
import TestCase from './TestCase';

function App() {
  const [dataSet, setDataSet] = useState([]);
  const[finalDataset, setFinalDataset] = useState([]);

  useEffect(()=>{        
      const myData = fireDB.database().ref("/data/");
      myData.on("value", (snapshot) => {
        const data = snapshot.val();
        var arrData= []
        for(let id in data){
          arrData.push(data[id]);
        }
        setDataSet(arrData);
      });
      const myData2 = fireDB.database().ref("/mData/")
      myData2.on("value", (snapshot)=>{
        const data2 = snapshot.val();
        let arrData2 = []
        for(let id in data2){
          arrData2.push(data2[id]);
        }
        setFinalDataset(arrData2);
      })
  },[]);

  return (
    <div className="App"> 
      <Home dbdata={dataSet}/>
      <Production dbdata={dataSet}/>
      <LineChart dbdata={dataSet}/>
      <Pie dbdata={finalDataset}/>
      <BarChart dbdata={finalDataset}/>
    </div>
  );
}

export default App;
