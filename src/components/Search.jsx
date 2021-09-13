import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../slices/searchSlice";

export default function Search() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);

  console.log(data);

  const [item, setItem] = useState({
    search: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({...item, [name]: value});
    dispatch(changeSearchField(value));
  }

  return(
    <form>
      <input name='search' type='text' value={item.search} onChange={handleChange} />
    </form>
  );
}