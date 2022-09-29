import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { AddWord } from './AddWord/AddWord';
import { TestPage } from './TestPage/TestPage';
import { StatisticPage } from './StatisticPage/StatisticPage';
import './App.scss';


function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/add-word' element={<AddWord />}/>
          <Route path='/test' element={<TestPage />}/>
          <Route path='/statistic' element={<StatisticPage />}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
