import React from 'react';
import {XSquare} from 'react-bootstrap-icons';
import { Alert, Card, Form, Col, Button, Row, ListGroup } from 'react-bootstrap';
import { footer, is2DigitNumber, sumImpiarmentArray } from './utils';

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      entry:"",
      percents:[],
      totalPercent:0
    }
    this.setInputFocus = this.setInputFocus.bind(this);
  }

  setInputFocus() {
    this.myInputRef.focus();
  }

  clearList() {
    this.setState({percents:[], entry:"", totalPercent:0});
    this.setInputFocus();
  }

  updateEntry = (event) => {
    const val = event.target.value;
    if (val.length === 2){
      if (is2DigitNumber(val)){
        const newArr = this.state.percents;
        newArr.push(val);
        event.preventDefault(); this.setState({entry:"", percents:newArr, totalPercent:sumImpiarmentArray(newArr)});
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
    var newVal = 0;
    if (newArr.length !== 0){
      newVal = sumImpiarmentArray(newArr);
    }
    this.setState({percents:newArr, entry:"", totalPercent:newVal});
    this.setInputFocus();
  }

  calculateRows() {
    return (
      <ListGroup>
        {this.state.percents.map((item,index) => (
            <ListGroup.Item key={index} >{item}
              <span className="float-end"><XSquare onClick={() => this.removeItem(index)} /></span>
            </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  renderResult(){
    if (this.state.totalPercent > 0 ) {
      return (<><b>{Math.round(this.state.totalPercent)}%</b> impairment (2DP {Math.round(this.state.totalPercent*100)/100}%)</>)
    } else {
      return "Start entering numbers"
    }
  }

  render(){
    return (
      <>
        <p />
        <Card>
          <Card.Body>
            <Row><Col><p>{this.renderResult()}</p> </Col></Row>
            <Row>
              <Col xs={7}>
                <Form>
                  <Form.Group controlId="formPercent">
                    <Form.Control 
                      type="text" 
                      inputMode="numeric" 
                      autoFocus 
                      placeholder="eg 15,05,10" 
                      onChange={this.updateEntry} value={this.state.entry}
                      ref={c => (this.myInputRef = c)}
                    />
                  </Form.Group>
                </Form>              
              </Col>
              <Col>
                <Button variant="secondary" onClick={() => this.clearList()}>Clear</Button>
              </Col>              
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