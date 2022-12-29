import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import { User } from './components/user/User';
import { Admin } from './components/admin/Admin';
import { Register } from './components/register/Register';
import { Login } from './components/login/Login';
import { Movies } from './components/movies/Movies';
import { MoviesNavbar } from './components/movies/navbar.movie/movies.navbar';
import { Favorite } from './components/movies/favorite/favorite'
import { Provider } from 'react-redux';
import store from './components/store/Store';
function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />;
          <Route path='/user' element={<User />} />;
          <Route path='/admin' element={<Admin />} />;
          <Route path='/register' element={<Register />} />;
          <Route path='/login' element={<Login />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/moviesnavbar' element={<MoviesNavbar />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>

      </Provider>    </div>
  );
}

export default App;
