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
export function is2DigitNumber(digits){
  const nums = ['0','1','2','3','4','5','6','7','8','9'];
  if(nums.indexOf(digits[0])===-1){return false;}
  if(nums.indexOf(digits[1])===-1){return false;}
  return true;
}
export function sumImpiarmentArray(array){
  var total=0; /* here */
  var remainder=100; /* here */
  array.forEach(function (item, index) {
    remainder = (100-total);
    total = total + remainder*(parseInt(item,10)/100);
  });
  return total;
}