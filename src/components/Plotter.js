import React, { useState } from 'react'

import Plot from './Plot'

import '../App.css';
import ParameterBar from './ParameterBar';

function Plotter() {

    const [dimension, setDimension] = useState("none");
    const [measure, setMeasure] = useState("none");

    return (
        <div className="plotter">
           <ParameterBar title="Dimensions" type='dimension' setDimension={setDimension}/>
           <ParameterBar title="Measures" type='measure' setMeasure={setMeasure}/>             
           <Plot measure = {measure} dimension = {dimension} />
        </div>
    )
}

export default Plotter
