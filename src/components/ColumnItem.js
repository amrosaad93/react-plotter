import React from 'react'
import { useDrag } from 'react-dnd';


const ColumnItem = ({name, type}) => {

    const[{isDragging} , drag] = useDrag({
        type: {type} === 'dimension' ? 'dimension' : 'measure',
        item: {
            name: {name},
            type: {type},
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    const bgColor = type==='dimension'? '#1E9360' : '#1F6088';

    return (
        <div ref={drag} className='column-item' style={{backgroundColor: isDragging? 'rgb(213, 216, 220)' : 'white'}}>
            <p>
                {name}
            </p>   
            <div className='column-item-type' style={{backgroundColor: bgColor}}>
                  {type}
            </div>
        </div>
    )
}


export default ColumnItem
