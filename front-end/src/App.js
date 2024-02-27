import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Home from './pages/Home/home';
import SignUp from "./components/signup"
import Login from './pages/Login/login';

import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route index element={ <Login/> } />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={ <Home/> } />
  </>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
