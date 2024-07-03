import React from 'react'

import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import Auth from './pages/Auth/Auth.jsx';
import Questions from './pages/Questions/Questions.jsx';
import AskQuestion from './pages/AskQuestion/AskQuestion.jsx';
import DisplayQuestion from './pages/Questions/DisplayQuestion.jsx';
import Tags from './pages/Tags/Tags.jsx';
import Users from './pages/Users/Users.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';

// const AllRoutes = () => {
//   return (

//       <Routes>

//         <Route exact path='/' element={<Home />}/>
//         <Route exact path='/Auth' element={<Auth />}/>
//         <Route exact path='/Questions' element={<Questions />}/>
//         <Route exact path='/AskQuestion' element={<AskQuestion />}></Route>
//         <Route exact path='/Questions/:id' element={<DisplayQuestion />}></Route>
//         <Route exact path='/Tags' element={<Tags />}/>
//         <Route exact path='/Users' element={<Users />}/>
//         <Route exact path='/Users/:id' element={<UserProfile />}/>

//       </Routes>

//   )
// }

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
    </Routes>
  );
};

export default AllRoutes
