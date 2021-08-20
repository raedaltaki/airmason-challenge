import React,{ useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState({
    search:'',
    type:'',
    year:''
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home searchedMovies={searchedMovies } setSearchedMovies={setSearchedMovies} searchInput={searchInput} setSearchInput={setSearchInput}/>
        </Route> 
        <Route exact path="/:movieID" component={Details}/>
        <Route component={Home} />
      </Switch>
  </Router>
  );
}

export default App;
