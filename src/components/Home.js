import React, { Component } from 'react';
import { MuiThemeProvider, AppBar, Card, CardActions, CardText, TextField, RaisedButton, Dialog } from 'material-ui';
import 'mootools';

export const Home = props => (
  <MuiThemeProvider>
    <div className="home-form">
      <AppBar showMenuIconButton={false} title="to-day"/><br/><br/>
      <Card style={{ width: "35%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
        {props.page === "signup"? <SignUp/> : <LogIn {...props}/>}
      </Card>
    </div>
  </MuiThemeProvider>
);

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {
        email: "",
        userName: "",
        password: "",
      },
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, val) {
    const userInfo = Object.clone(this.state.userInfo);
    userInfo[type] = val;
    this.setState({ userInfo });
  }

  handleSignUp() {
    const searchParams = Object.keys(this.state.userInfo).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state.userInfo[key]);
    }).join('&');

    fetch('http://localhost:8000/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: searchParams
    }).then(json => this.setState({ open: true }));
  }

  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false} title="Sign up"/>
        <CardText>
          <TextField hintText="Email" floatingLabelText="Please enter your email"
                     onChange={(e, val) => { this.handleChange("email", val)}}/><br/>
          <TextField hintText="Username" floatingLabelText="Please enter your username"
                     onChange={(e, val) => { this.handleChange("userName", val)}}/><br/>
          <TextField hintText="Password" floatingLabelText="Please enter your password" type="password"
                     onChange={(e, val) => { this.handleChange("password", val)}}/><br/>
        </CardText>
        <CardActions>
          <RaisedButton label="Sign up" primary={true} onTouchTap={() => this.handleSignUp()}/>
        </CardActions><br/>
        <CardText>
          <p>Have an account? <a href="/#/">Click here!</a></p>
        </CardText><br/>
        <Dialog title="Account Created" modal={false} open={this.state.open}
                onRequestClose={() => { this.setState({ open: false })}}>
          Please route to the login screen to view your account!
        </Dialog>
      </div>
    );
  }
}

class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {
        userName: "",
        password: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, val) {
    const userInfo = Object.clone(this.state.userInfo);
    userInfo[type] = val;
    this.setState({ userInfo });
  }

  async handleLogIn() {
    const searchParams = Object.keys(this.state.userInfo).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state.userInfo[key]);
    }).join('&');

    const body = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: searchParams
    }).then(res => res.json());

    this.props.history.push(`/create/${body._id}`);
  }

  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false} title="Login"/>
        <CardText>
          <TextField hintText="Username" floatingLabelText="Please enter your username"
                     onChange={(e, val) => { this.handleChange("userName", val)}}/><br/>
          <TextField hintText="Password" floatingLabelText="Please enter your password" type="password"
                     onChange={(e, val) => { this.handleChange("password", val)}}/><br/>
        </CardText>
        <CardActions>
          <RaisedButton label="Login" primary={true} onTouchTap={() => this.handleLogIn()}/>
        </CardActions>
        <CardText>
          <p>Don't have an account? <a href="/#/signup">Click here!</a></p>
        </CardText><br/>
      </div>
    );
  }
}