import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import { loginUserSuccess } from '../actions';

class LoginForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
          email: '',
          password: ''
      }
    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.attemptLogin.bind(this)}>
                Login
            </Button>
        );
    }

    attemptLogin() {
        console.log('whatthefuck');
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log('hey 1');
                this.props.loginUserSuccess(user);
                Actions.drawer();
            })
            .catch(error => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(user => {
                        console.log('hey 2');
                        this.props.loginUserSuccess(user);
                        Actions.drawer();
                    })
                    .catch(error => console.log(error));
            });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Login</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true}>
                    <Form>
                        <Item fixedLabel>
                            <Label>Username</Label>
                            <Input
                                autoCapitalize={'none'}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                        <Button block onPress={()=> this.attemptLogin()}>
                            <Text>Login</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
};

export default connect(mapStateToProps, { loginUserSuccess })(LoginForm);
