// import { useState} from "react";
// import 'antd/dist/antd.css'
import Register from './component/register/Register';
// import axios from 'axios';
import Login from './component/login/Login';
import Forgetp from './component/forget/Forgetp';
import{BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import Home from './component/Home/Home';
import Like from './component/Home/likePage/Like';
import MovieList from './component/Home/movieList/MovieList';
import Search from './component/Home/search/SearchMovie';
import Moviedetail from './component/Home/movieList/Moviedetail';


function App() {
 
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path='/login' exact element ={<Login />}/>
        <Route path ='/register' element={<Register />}/>
        <Route path ='/forget' element={<Forgetp />}/>
        <Route path ='/' element={<Home />}>
          <Route path='/like' element = {<Like />}/>
          <Route path='/movie' element = {<MovieList />}/>
          <Route path= '/searchmovie' element = {<Search />}/>
          <Route path='/movie/:id/:type/:title' exact element= {<Moviedetail />}  />
        </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
