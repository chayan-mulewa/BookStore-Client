import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Search, Signin, Signup, AdminSignin, AdminSignUp, Cart, BookPost, DeleteBook, UpdateBook, UpdateBookForm } from './pages/index';
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
        <Route path='/admin/delete-book' element={<DeleteBook />} />
        <Route path='/admin/update-book' element={<UpdateBook />} />
        <Route path='/admin/update-book/:id' element={<UpdateBookForm />} />
        <Route path='*' element={<div className='h-screen w-screen flex justify-center items-center text-xl font-bold bg-gray-600 text-white'>404 PAGE NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
