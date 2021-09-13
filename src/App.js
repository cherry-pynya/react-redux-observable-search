import React from "react";
import "./style.css";
import Search from './components/Search';
import { useSelector } from 'react-redux';

export default function App() {
  const empty = useSelector((state) => state.search.inputEmpty);
  return (
    <div>
      <Search />
      {empty && <div><span>Type something...</span></div>}
    </div>
  );
}
