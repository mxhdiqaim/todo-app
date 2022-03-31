import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';

// Context APIs
import AlertState from './context/alert/AlertState';

import './App.scss';

const App = () => {
  return (
    <AlertState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </AlertState>
  );
};

export default App;
