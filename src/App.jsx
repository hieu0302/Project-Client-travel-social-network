import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsFeed from "./pages/NewsFeed/newsfeed";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <NewsFeed />
    </>
  );
};

export default App
