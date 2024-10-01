import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function VisitorsInfo({}) {

  const [visits, setVisits] = useState(0);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    getCounts();
  };

  const getCounts = async() => {
    var baseUrl = process.env.REACT_APP_VISITORS_BASE_URL;
    var apiurl = baseUrl + "/getCounts";

    axios.get(apiurl)
    .then(res => {
        debugger;
        setVisits(res.data.visits);
        setVisitors(res.data.visitors);
    })
    .catch(error => {
        //
    });
  };

  const downloadCSV = async() => {
    try{
        var baseUrl = process.env.REACT_APP_VISITORS_BASE_URL;
        var apiurl = baseUrl + "/downloadCsv";

        const response = await axios.get(apiurl, { responseType: 'blob' });
        const csvData = response.data;

        const url = window.URL.createObjectURL(new Blob([csvData]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'visitors.csv');

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    }
    catch(error){
        //
    }
  };

  return (
    <Container>
        <button className='donwload-button' onClick={downloadCSV}>Download detailed data</button>

      <div className="header">
        <h1>Visitors Count</h1>
      </div>

      <div className="main-container">
        <div className="count-container">
            <div className="count-card">
                <div className="header">
                    Total Visits
                </div>
                <div className="count visits" id="visits">{visits}</div>
            </div>
            <div className="count-card visitors">
                <div className="header">
                    Total visitors
                </div>
                <div className="count visitors" id="visitors">{visitors}</div>
            </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
    .header{
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;

        h2{

        }
    }

    .main-container{
        display: flex;
        justify-content: center;
    }
    .count-container{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        width: 40%;
        justify-content: center;

        .count-card{
            height: 10rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 1px 2px 5px #ccc;

            .header{
                height: 30%;
                width: 100%;
                font-size: 1.5rem;
            }

            .count{
                font-size: 2rem;
                font-weight: bolder;
                width: 100%;
                height: 70%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .donwload-button{
        position: absolute;
        right: 2rem;
        top: 2rem;
        background-color: green;
        color: #fff;
        padding: 0.5rem;
        padding-block: 0.5rem;
        border: none;
        outline: none;
        border-radius: 0.5rem;
        transition: 0.1s ease-in-out;
        cursor: pointer;
        font-size: 1.2rem;
    }

    .donwload-button:hover{
        transform: scale(0.95);
    }
`;

export default VisitorsInfo
