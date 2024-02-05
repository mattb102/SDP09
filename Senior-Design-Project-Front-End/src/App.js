import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './pages/Login/Login';
import Root from './components/Root';
import SignUp from './components/SignUp';
import Home from './pages/Home/home';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route index element={ <Welcome/> } />
    <Route path="/sign-in" element={ <Login/> } />
    <Route path="/sign-up" element={ <SignUp/> }/>
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
