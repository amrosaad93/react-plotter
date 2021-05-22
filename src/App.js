import Header from './components/Header'
import Columns from './components/Columns'
import Plotter from './components/Plotter'

import {DndProvider} from 'react-dnd'
import  { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Header />
        <div className="main-page"> 
          <div className="columns">
            <Columns/>
          </div>
            <Plotter/>
        </div>
      </>
    </DndProvider>
  );
}

export default App;
