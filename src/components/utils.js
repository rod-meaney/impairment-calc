import React from 'react';
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';
import Image from 'react-bootstrap/Image';
export function footer(){
  return (
    <>
      <br />
      <p>
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/rodkm/"><Image style={{width:24}} src={linkedin} /> Developer</a>
        {" | "}
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/rod-meaney/impairment-calc"><Image style={{width:24}} src={github} /> Code</a>
      </p>
    </>
  );
}
