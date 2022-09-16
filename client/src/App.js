import './App.css';
import Home from './components/Home.jsx'
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import CreateGame from './components/CreateGame';
import GameDetail from './components/GameDetail';
import About from './components/About';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import { useSelector } from 'react-redux'

function App() {

  const redux = useSelector(state => state)

  return (
    <div className="App">
      <Route exact path='/create' render={() => <CreateGame />}
      />
      <Route exact path='/game/:id' render={() => <GameDetail />} />
      <Route exact path='/' render={() => <LandingPage />} />
      <Route exact path='/home' render={() => <Home /> } />
      <Route exact path='/about' render={() => <About />} />
      <Route exact path='/home' render={() => <SearchBar/>} />
    </div>
  );
}

export default App;
