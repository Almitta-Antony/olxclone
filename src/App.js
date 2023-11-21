import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import View from './Pages/ViewPost';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext, FirebaseContext } from './store/FirebaseContext'
import Create from './Pages/Create';
import Post from './store/PostContext';
import AllPostContext from './store/AllPostContext'


function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })

  }, [])
  return (
    <div>

  <AllPostContext>
          <Post>

            <Router>
              <Route exact path='/'  > <Home /></Route>
              <Route path='/signup' > <Signup /></Route>
              <Route path='/login' > <Login /></Route>
              <Route path='/create' > <Create /></Route>
              <Route path='/view' > <View /></Route>
            </Router>
    
          </Post>
    
  </AllPostContext>   
  
 </div>
  );
}

export default App;
