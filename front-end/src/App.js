import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import Dashboard from './pages/dashboard'
import Root from './components/root';

import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={ <Root/> }>
      <Route index element={ <LoginPage/> } />
      <Route path="/dashboard" element={ <Dashboard/> } />
    </Route>
  </>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
