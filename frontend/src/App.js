import { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import VisitorsInfo from './pages/VisitorsInfo';

function App() {

  const [ipAddress, setIpAddress] = useState('');
  const [geoInfo, setGeoInfo] = useState({});

  useEffect(() => {
    var newVisit = sessionStorage.getItem("newvisit");
    if(newVisit === null || newVisit === undefined || newVisit === ''){
      handleVisitor();
    }
  }, []);

  const handleVisitor = async() => {
    var ip = await getVisitorIp();
    await fetchIpInfo(ip);
  };

  const getVisitorIp = async() => {
    try{
      const response = await fetch('https://api.ipify.org');
      const data = await response.text();
      setIpAddress(data);
      return data;
    }catch(error){
    }
  };

  const fetchIpInfo = async(ip) => {
    try{
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      setGeoInfo(data);
      await updateCounts(data.country, data.regionName, data.city, data.zip, data.query);

    }catch(error){
      console.log(error);
    }
  };

  const updateCounts = async(country, state, city, zip, ip) => {
    var visitor = localStorage.getItem("visitor");
    var baseUrl = process.env.REACT_APP_VISITORS_BASE_URL;
    if(visitor === null || visitor === undefined || visitor === ''){
      var url = baseUrl+"/updateCounts?type=new-visitor";
    }
    else{
      var url = baseUrl+"/updateCounts";
    }

    axios.post(url, {
      country, state, city, zip, ip
    })
    .then(res => {
      localStorage.setItem("visitor", "$2b$10$XxvOLh.HyNxogt4EQHqsOeswq0nl/DdVnvy6Jm.niUHZisGbT6yXS")
      sessionStorage.setItem("newvisit", "$2b$10$XxvOLh.HyNxogt4EQHqsOeswq0nl/DdVnvy6Jm.niUHZisGbT6yXS")
    })
    .catch(error => {
    });
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home ipAddress={ipAddress} setIpAddress={setIpAddress}/>} exact/>
        <Route path="/about" element={<About/>} exact/>
        <Route path="/contact" element={<Contact/>} exact/>
        <Route path="/visitors" element={<VisitorsInfo/>} exact/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
