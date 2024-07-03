import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './Routes.jsx';
import { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question.js';
import { fetchAllUsers } from './actions/users.js';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
 <>
    <div className="App">
      <Router>
      <div>
       <ToastContainer /> 
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </div> 
      </Router>
    </div>
  </>  
  );
}

export default App;
