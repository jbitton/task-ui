import React, { Component } from 'react';
import { MuiThemeProvider, AppBar, Card, CardActions, CardText, TextField, RaisedButton, Dialog } from 'material-ui';
import 'mootools';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const userInfo = await fetch(`http://localhost:8000/users/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    }).then(res => res.json());
    this.setState({ userInfo });
  }

  handleChange(type, val) {
    if (val.replace(" ", '').length !== 0) {
      const userInfo = Object.clone(this.state.userInfo);
      userInfo[type] = val;
      this.setState({ userInfo });
    }
  }

  handleSettings() {
    const searchParams = Object.keys(this.state.userInfo).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state.userInfo[key]);
    }).join('&');

    fetch(`http://localhost:8000/users/${this.props.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: searchParams
    }).then(json => this.setState({ open: true }));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card style={{ width: "50%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
            <AppBar showMenuIconButton={false} title="Account Settings"/>
            <CardText>
              <p>Please fill in all the fields you'd like to change:</p>
              <TextField hintText="Email" floatingLabelText="Change your email"
                         onChange={(e, val) => { this.handleChange("email", val)}}/><br/>
              <TextField hintText="Username" floatingLabelText="Change your username"
                         onChange={(e, val) => { this.handleChange("userName", val)}}/><br/>
              <TextField hintText="Password" floatingLabelText="Change your password" type="password"
                         onChange={(e, val) => { this.handleChange("password", val)}}/><br/>
            </CardText>
            <CardActions>
              <RaisedButton label="Change" primary={true} onTouchTap={() => this.handleSettings()}/>
            </CardActions><br/>
          </Card>
          <Dialog title="Account Settings Changed" modal={false} open={this.state.open}
                  onRequestClose={() => { this.setState({ open: false })}}>
            Your account settings have been updated!
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Settings;