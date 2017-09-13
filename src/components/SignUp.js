import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';

import { createUser } from '../actions';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
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
            <Button onPress={this.attemptSignUp.bind(this)}>
                Sign Up
            </Button>
        );
    }

    attemptSignUp() {
        const { email, password } = this.state;
        this.props.createUser({ email, password });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true}>
                    <Form>
                        <Item fixedLabel>
                            <Label>Email</Label>
                            <Input
                                autoCapitalize={'none'}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                value={this.state.confirmPassword}
                            />
                        </Item>
                        <Button block style={{ marginTop: 20 }} onPress={()=> this.attemptSignUp()}>
                            <Text>Sign Up</Text>
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

export default connect(mapStateToProps, { createUser })(SignUp);
