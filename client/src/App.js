import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import React from 'react'
import {useContext} from 'react'
import {Context} from './context/Context.js'
import Home from './views/home/Home'
import NavBar from './components/navbar/NavBar'
import Login from './views/login/Login';
import Registro from './views/registro/Registro'
import Settings from './views/settings/Settings'
import PostDetalle from './components/postDetalle/PostDetalle'
import Publicar from './views/publicar/Publicar'
import UnoSolo from './views/unoSolo/UnoSolo'



function App() {
  const {user} = useContext(Context)

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'> <Home /> </Route>
        <Route path='/registro'> {user ? <Home /> : <Registro />} </Route>
        <Route path='/login'> {user ? <Home /> : <Login /> } </Route>
        <Route path='/publicar'> {user ? <Publicar />: <Registro /> }</Route>
        <Route path='/configuracion'> {user ? <Settings /> : <Registro /> }</Route>
        <Route path='/postdetalle'> <PostDetalle /></Route>
        <Route path="/post/:postId"><UnoSolo /></Route>
      </Switch>
    </Router>
  );
}

export default App;
