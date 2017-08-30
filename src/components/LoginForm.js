import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';

import { loginUser } from '../actions';

class LoginForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
          email: '',
          password: ''
      }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.user) {
            Actions.drawer();
        }
    }

    renderButton() {
        if(this.props.auth.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.attemptLogin.bind(this)}>
                Login
            </Button>
        );
    }

    attemptLogin() {
        const { email, password } = this.state;
        this.props.loginUser({ email, password });
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

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
