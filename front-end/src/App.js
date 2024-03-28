import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard'

import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route index element={ <Login/> } />
    {/*<Route path="/signup" element={ <SignUp/> } />*/}
    <Route path="/dashboard" element={ <Dashboard/> } />
  </>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
