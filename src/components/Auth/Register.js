import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({errors:[], loading: true});
    if(this.isFormValid()) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
        this.setState({loading: false});
      })
      .catch(err => {
        console.error(err);
        this.setState({errors: this.state.errors.concat(err), loading: false});
      });
    }
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if(this.isFormEmpty(this.state)) {
      error = {message: 'Fill in all fields'};
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    }else if(!this.isValidPassword(this.state)) {
      error = {message: 'Password is invalid'};
      this.setState({ errors: errors.concat(error), loading: false});
      return false;
    }else {
      return true;
    }
  }

  isFormEmpty = ({username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isValidPassword = ({password, passwordConfirmation}) => {
    if(password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    }else if(password !== passwordConfirmation) {
      return false;
    }else {
      return true;
    }
  }

  displayErrors = errors => errors.map((error, i) =><p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    errors.some(error => {
      return error.message.toLowerCase().includes(inputName) ? 'error':'';
    })
  }

  render() {

    const { username, email, password, passwordConfirmation, errors, loading} = this.state;

    return(
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="paper plane outline" color="orange" />
            Register for Chat-me
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                type="email"
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                type="password"
                className={this.handleInputError(errors, 'password')}
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                type="password"
                className={this.handleInputError(errors, 'password')}
              />
              <Button disabled={loading} className={loading ? 'loading':''} color="orange" fluid size="large">
                Submit
              </Button>
              {errors.length > 0 &&(
                <Message>
                  <Message.Header>Error</Message.Header>
                  {this.displayErrors(errors)}
                </Message>
              )}
              <Message>Already a user? <Link to="/login">Login</Link></Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;