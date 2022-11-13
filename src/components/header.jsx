import React from "react";

//the styling done for the header
//done inline to not make another file

const headerStyle = {
  display: "inline-block",
  textAlign : "center",
  marginTop : "2em",
  backgroundColor: "darkgrey",
  color:"azure",
  // border: ".5rem solid #e4412f",
  border: ".5rem solid #6F1D1B",
  borderRadius: "2em",
  padding:"1em 8em 1em 8em"
}
const flexCenter = {
  display:"flex",
  justifyContent:"space-around",
  alignItems:"center"
}
//this is used on the Home Page and each Pokemon's page
//the literal header for the pages
export default function Heading(props) {
  return (
    <div style={flexCenter}>
    <div style={headerStyle}>
      <h1>{props.name}</h1>
      <p>{props.subtext}</p>
    </div>
    </div>
  );
}
