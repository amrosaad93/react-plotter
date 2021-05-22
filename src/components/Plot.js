import React, { useState , useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import '../App.css';

const plotDataUri = 'https://plotter-task.herokuapp.com/data';

const Plot = (parameters) => {
 
    console.log(parameters);

const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [data, setData] = useState({});

useEffect(() => {

    const fetchPlotData = async () => {
        setLoading(true);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "measures": [parameters.measure],
            "dimension": parameters.dimension
        })
    };

    try {
        const response = await fetch(plotDataUri,requestOptions);
        const plotData = await response.json();
        setLoading(false);
        setData ({
            labels: plotData[0].values,
            datasets: [
              {
                label: plotData[1].name,
                data: plotData[1].values,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: '#7C3141',
              },
              /*{
                label: 'Units Sold',
                data: [1202,1257,1095,1215,1198,1194,1158,1114,1357, 1087,1249],
                fill: false,
                backgroundColor: 'rgb(255, 99, 0)',
                borderColor: 'rgba(255, 99, 0, 0.2)',
              },
              */
            ],
          }) ;
    }
    catch(error) {
        setLoading(false);
        setError("An Error happened! Please try again later.");
    }
};


    if(parameters.measure !== 'none' && parameters.dimension !== 'none')
        fetchPlotData();  

}, [parameters ]);

//    const [isDataAvailable , setIsDataAvailable ] = useState(true);
   
      const   options= {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: parameters.dimension,
                color: 'black',
                font: {
                  size: 20,
                  lineHeight: 1.2,
                },
                padding: {top: 20, left: 0, right: 0, bottom: 0}
              }
          },
              y: {
          display: true,
          title: {
            display: true,
            text: parameters.measure,
            color: 'black',
            font: {
              size: 20,
              lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
          }
        }
      }
      };
    
      if(error !== '') {
        return <p className="no-info-msg">{error}</p>
      }
      if (parameters.measure === 'none' && parameters.dimension ==="none") {
          return <p className="no-info-msg">Please add a dimension and a measure to display the Graph</p>
        }
      if (parameters.measure === 'none' ) {
        return <p className="no-info-msg">Please add a measure to display the Graph</p>
        }
      if (parameters.dimension === 'none' ) {
        return <p className="no-info-msg">Please add a dimensionto display the Graph</p>
        }
      if(loading) {
        return <p className="no-info-msg">Loading...</p>
        }
       return  (
        <>
            <Line data={data} options={options} />
        </>
        );
}

export default Plot;