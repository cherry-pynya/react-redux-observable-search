import "./style.css";
import Search from './components/Search';
import { useSelector } from 'react-redux';
import Items from "./components/Items";

export default function App() {
  const empty = useSelector((state) => state.search.inputEmpty);

  return (
    <div>
      <Search />
      {empty && <div><span>Type something...</span></div>}
      <Items />
    </div>
  );
}
