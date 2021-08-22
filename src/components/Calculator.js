import React from 'react';
import {TrashFill} from 'react-bootstrap-icons';
import { Alert, Card, Form, Col, Button, Row, ListGroup } from 'react-bootstrap';
import { footer } from './utils';

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      entry:"",
      percents:[],
      total:0,
      resultText:"Start entering numbers",
      resultTextDefault:"Start entering numbers"
    }
    this.setInputFocus = this.setInputFocus.bind(this);
  }

  setInputFocus() {
    this.myInputRef.focus();
  }

  clearList() {
    this.setState({percents:[], entry:"", resultText:this.state.resultTextDefault});
    this.setInputFocus();
  }

  calculate(array) {
    var total=0; /* here */
    var remainder=100; /* here */
    array.forEach(function (item, index) {
      remainder = (100-total);
      total = total + remainder*(parseInt(item,10)/100);
    });
    return Math.round(total)+"% impairment (2DP "+ Math.round(total*100)/100 + "%)";
  }

  isNumber(digits){
    const nums = ['0','1','2','3','4','5','6','7','8','9'];
    if(nums.indexOf(digits[0])===-1){return false;}
    if(nums.indexOf(digits[1])===-1){return false;}
    return true;
  }

  updateEntry = (event) => {
    const val = event.target.value;
    if (val.length === 2){
      if (this.isNumber(val)){
        const newArr = this.state.percents;
        newArr.push(val);
        event.preventDefault(); this.setState({entry:"", percents:newArr, resultText:this.calculate(newArr)});
      } else {
        alert('Must be a number between 01 and 99.')
        event.preventDefault(); this.setState({entry:""});
      }

    } else {
      event.preventDefault(); this.setState({entry:event.target.value});
    }
  }

  removeItem = (key) => {
    const newArr = this.state.percents;
    newArr.splice(key,1);
    var text = this.state.resultTextDefault
    if (newArr.length !== 0){
      text = this.calculate(newArr);
    }
    this.setState({percents:newArr, entry:"", resultText:text});
    this.setInputFocus();
  }

  calculateRows() {
    return (
      <ListGroup>
        {this.state.percents.map((item,index) => (
            <ListGroup.Item key={index} >{item}
              <span className="float-end"><TrashFill onClick={() => this.removeItem(index)} /></span>
            </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  render(){
    return (
      <>
        <p />
        <Card>
          <Card.Body>
            <Row><Col><p>{this.state.resultText}</p> </Col></Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formPercent">
                    <Form.Control 
                      type="text" 
                      inputMode="numeric" 
                      autoFocus 
                      placeholder="eg 15,05,10" 
                      onChange={this.updateEntry} value={this.state.entry}
                      ref={c => (this.myInputRef = c)}
                    /> {' '}  
                    <Button variant="secondary" onClick={() => this.clearList()}>Clear</Button>
                  </Form.Group>
                </Form>              
=              </Col>              
            </Row>
            <p />
            <Row><Col>{this.calculateRows()}</Col></Row>
            <p />
            <Alert variant="dark">Impairment Calculator</Alert>
            The calculator will add percentages together to give you combined percentages based on the sum of:
            <ul>
              <li>First injury%</li>
              <li>(100 - First injury%) x % Second injury% = Second injury total%</li>
              <li>(100 - First injury% - Second injury total%) x Third injury% = Third injury total%</li>
              <li>and so on...</li>
            </ul>
            {footer()}
          </Card.Body>
        </Card>
      </>
    )
  }
}
export default Calculator;