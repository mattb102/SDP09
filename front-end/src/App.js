import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import SignUp from "./components/signup"
import Root from './components/root';
import Home from './pages/Home/home';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route index element={ <Login/> } />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/" element={ <Root/> }>
      <Route path="home" element={ <Home/> } />
    </Route>
  </>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
