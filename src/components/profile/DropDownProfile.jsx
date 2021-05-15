import React from "react";

export default function DropDownProfile(props) {
  return (
    <nav className="dropDown">
      <ul className="dropDown-nav">{props.children}</ul>
    </nav>
  );
}
