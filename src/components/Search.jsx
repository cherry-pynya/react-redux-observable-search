import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputEmptyFalse, inputEmptyTrue } from '../slices/searchSlice';

export default function Search() {
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    search: '',
  });

  console.log(item)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({...item, [name]: value});
  }

  return(
    <form>
      <input name='search' type='text' value={item.search} onChange={handleChange} />
    </form>
  );
}