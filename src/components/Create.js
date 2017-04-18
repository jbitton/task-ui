import React, { Component } from 'react';
import { MuiThemeProvider, Card, CardHeader, CardText, Stepper, Step, StepLabel, FlatButton, RaisedButton, TextField } from 'material-ui';
import * as utils from '../assets/util';
import '../assets/App.css';
import 'mootools';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      task: {
        title: "",
        description: "",
        subject: "",
        dueDate: ""
      }
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, val) {
    const task = Object.clone(this.state.task);
    task[type] = val;
    this.setState({ task });
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (this.state.stepIndex >= 3) { utils.addTask(this.state.task, this.props.userId); }
    this.setState({ stepIndex: stepIndex + 1, finished: stepIndex >= 3 });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) { this.setState({stepIndex: stepIndex - 1}); }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<TextField floatingLabelText="Please enter the title"
                           onChange={(e, val) => { this.handleChange("title", val)}}/>);
      case 1:
        return (<TextField floatingLabelText="Please enter the description" multiLine={true} rows={2}
                           onChange={(e, val) => { this.handleChange("description", val)}}/>);
      case 2:
        return (<TextField floatingLabelText="Please enter the subject"
                           onChange={(e, val) => { this.handleChange("subject", val)}}/>);
      case 3:
        return (<TextField floatingLabelText="Please enter the due date" floatingLabelFixed={true} defaultValue="yyyy-mm-dd"
                           multiLine={true} onChange={(e, val) => { this.handleChange("dueDate", val)}}/>);
      default:
        return -1;
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div>
        <br/>
        <MuiThemeProvider>
          <Card style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
            <CardHeader title="New Task" subtitle="Create another task"/>
            <CardText>
              <Stepper activeStep={stepIndex}>
                <Step><StepLabel>Title</StepLabel></Step>
                <Step><StepLabel>Description</StepLabel></Step>
                <Step><StepLabel>Subject</StepLabel></Step>
                <Step><StepLabel>Due Date</StepLabel></Step>
              </Stepper>
              {finished
              ? (
                <p>Task created!<t/>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({stepIndex: 0, finished: false});
                    }}
                  >Click here</a> to make another task!</p>)
              : (<div>
                  {this.getStepContent(stepIndex)}<br/>
                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}/>
                    <RaisedButton
                      label={stepIndex === 3 ? 'Finish' : 'Next'}
                      primary={true}
                      onTouchTap={this.handleNext}/>
                  </div>
                </div>)}
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Create;