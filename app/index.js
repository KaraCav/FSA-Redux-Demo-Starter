import React, { useState } from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container);
// write your Color component here
const Color = (props) => {
  const className = props.color === props.selectedColor ? props.color + " selected" : props.color
  return (
    <div
      className={className}
      onClick={() => props.setSelectedColor(className)}
    ></div>
  );
};

const Picker = () => {
  const [selectedColor, setSelectedColor] = useState("red");

  return (
    <div id="container">
      <div id="navbar">
        <div>Currently selected: </div>
        <div className={selectedColor}>{selectedColor}</div>
      </div>
      <div id="colors-list">
        <Color color="red" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
        <Color color="blue" setSelectedColor={setSelectedColor} selectedColor={selectedColor}/>
        <Color color="green" setSelectedColor={setSelectedColor} selectedColor={selectedColor}/>
      </div>
    </div>
  );
};

root.render(<Picker />);
