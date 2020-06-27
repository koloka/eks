import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import AddProduct from './pages/AddProduct'
import ShowByCat from './pages/ShowByCat'
import ShowProduct from './pages/ShowProduct'
import Search from './pages/Search'
import Login from './pages/Login'
import {ProtectedRoute} from'./components/auth/ProtectedRoute'
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/test/protected" component={Home} />
        <Route exact path="/admin/login" component={Login} />
        <Route path="/search/:keyword" component={Search} />
        <ProtectedRoute exact path="/product/add" component={AddProduct} />
        <Route path="/product/showdetail/:id?" component={ShowProduct} />
        <Route path="/product/showall/:cat?" component={ShowByCat} />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <h1>Users</h1>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
