import React, { useState } from "react";

export default function DropDownItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="dropDown-item">
      <p className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </p>
      {open && props.children}
    </li>
  );
}
