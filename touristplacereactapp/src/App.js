import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddEditPlace from './components/AddEditPlace';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newplace" element={<AddEditPlace />} />
          <Route path="/newplace/:placeid" element={<AddEditPlace />} />
          <Route path='/*' element={<h2>Page not found! <br/> Please check the url.</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
