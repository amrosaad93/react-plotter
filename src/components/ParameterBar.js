import React, { useState } from 'react'
import { useDrop } from 'react-dnd';

const ParameterBar = ({title , type , setDimension , setMeasure}) => {

    const bgColor = type==='dimension'? '#1E9360' : '#1F6088';
    
    const [content, setContent] = useState(type==='dimension'?  "Add Dimension from column" : "Add Measure from Column");
    const [{isOver}, drop] = useDrop({
        accept: {type} === "dimension" ? "dimension" : 'measure',
        drop: (item, moniter) => {
           if(item.type.type === type) {
                setContent(item.name.name);
                type==='dimension'? setDimension(item.name.name):setMeasure(item.name.name);          
             }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    })

    const clear = () => {
        setContent(type==='dimension'?  "Add Dimension from column" : "Add Measure from Column");
        type==='dimension'? setDimension('none'):setMeasure('none'); 
        console.log('clicked')
    };

    return (
        <div className='drag-target'
            ref={drop}>
            <div className='title'>
                <p>{title}</p>
            </div>
            <div className='input' style={{backgroundColor: isOver? 'rgb(244,235,207)': 'white'}}>
                <div className='content' style={{backgroundColor: bgColor}}>
                  {content}
                </div>
                <button onClick={clear} className='clear-btn'>Clear</button>
            </div>
        </div>
    )
}

export default ParameterBar

