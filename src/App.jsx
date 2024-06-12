import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Search, Signin, Signup, AdminSignin, AdminSignUp, Cart, BookPost } from './pages/index';
import './App.css';
import './index.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin/signin' element={<AdminSignin />} />
        <Route path='/admin/signup' element={<AdminSignUp />} />
        <Route path='/admin/post-book' element={<BookPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
