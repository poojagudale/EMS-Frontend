import { useState } from "react";

const UpdateSelect = () => {
  const [selectedValue, setSelectedValue] = useState("option1"); 

  const handleChange = (event) => {
    setSelectedValue(event.target.value); 
  };

  const handleUpdate = () => {
    alert(`Updated value: ${selectedValue}`);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="1"> 1</option>
        <option value="2"> 2</option>
        <option value="3"> 3</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateSelect;
