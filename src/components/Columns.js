import React, { useState, useEffect } from 'react'
import ColumnItem from './ColumnItem'

const columnsDataUri = 'https://plotter-task.herokuapp.com/columns';

function Columns() {

    const [loading, setLoading] =useState(true);
    const [error, setError] = useState('');
    const [columnsData, setColumnsData] = useState([]);

   const fetchColumns = async () => {
        setLoading(true);
        try {
            const response = await fetch(columnsDataUri);
            if (response.status >= 404)  {
                setLoading(false);
                setError("An Error happened fetching the columns! Please Try again later!");
                return;
            }
            const columnsData = await response.json();
            setLoading(false);
            setColumnsData(columnsData);
        } catch(error){
            setLoading(false);
            setError("An Error Happened! Please Try again later!");
            console.log(error);
        }
    
   };

   useEffect(() => {
       fetchColumns();  
   }, []);

   if(error !== '') {
    return <p className="no-info-msg">{error}</p>
  }

if(loading) {
    return (
        <div>
        <h3 style={{  color: 'rgb(121, 120, 120)'}}>Columns</h3>
        <hr/>
        <p className="no-info-msg">Loading...</p>

    </div>
    );
}
return (
    <div>
            <h3 style={{  color: 'rgb(121, 120, 120)'}}>Columns</h3>
        <hr/>

        {columnsData.map((column) => {
            return  <ColumnItem key={column.name} name={column.name}type={column.function}/>
        })}

     

    </div>
)   ;
      
          

    
}

export default Columns
