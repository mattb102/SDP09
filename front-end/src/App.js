import './App.css';
import { Flex } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Search from './components/search';
import PropertyCard from './components/property_card';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Search/>
        <Flex flexWrap="wrap" justify="space-around">
          <PropertyCard/>
          <PropertyCard/>
          <PropertyCard/>
          <PropertyCard/>
          <PropertyCard/>
      </Flex>
    </div>
  );
}

export default App;
