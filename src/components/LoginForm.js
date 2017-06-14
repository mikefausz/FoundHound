import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import validate from 'validate.js';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Right, Body, Title, Icon, Spinner } from 'native-base';
import { loginUserSuccess } from '../actions';

const constraints = {
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 6
        }
    }
};

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errors: {},
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

    renderErrors(field) {
        if(this.state.errors[field]) {
            return this.state.errors[field].map((error, idx) => {
                return <Text style={styles.errorText} key={idx}>{error}</Text>;
            });
        }
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button block onPress={()=> this.attemptLogin()}>
                <Text>Login</Text>
            </Button>
        );
    }

    attemptLogin() {
        this.setState({ ...this.state, loading: true, errors: {} });

        const { email, password } = this.state;

        const errors = validate({ email, password }, constraints);

        if(errors) this.setState({ ...this.state, loading: false, errors });

        else {
            const _this = this;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    this.setState({ ...this.state, loading: false });

                    // User successfully signed in, get profile from db and redirect
                    var userRef = firebase.database().ref('users/' + user.uid);
                    userRef.once('value')
                        .then(function(snapshot) {
                            console.log('Got user profile', snapshot.val());
                            _this.props.loginUserSuccess(snapshot.val());
                            Actions.drawer();
                        })
                        .catch((err) => {
                            console.log('ERROR', err);
                        });
                })
                .catch(error => {
                    console.log(error);
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            this.setState({ ...this.state, loading: false });

                            // User successfully created
                            console.log('Created user: ' + user.uid + ', adding user profile to db...');

                            // Create new user profile
                            const newUser = {
                                _id: user.uid,
                                email
                            };

                            // Store in state
                            _this.props.loginUserSuccess(newUser);

                            // Store in db and redirect
                            const userRef = firebase.database().ref('users/' + user.uid);
                            userRef.set(newUser)
                                .then(() => {
                                    console.log('Added user to db');
                                    Actions.drawer();
                                })
                                .catch((err) => {
                                    console.log('ERROR', err);
                                });
                        })
                        .catch(error => {
                          this.setState({ ...this.state, loading: false, errors: { firebase: [error.message] }});
                          console.log(error);
                        });
                });
        }
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
                            <Label>Email</Label>
                            <Input
                                autoCapitalize={'none'}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        {this.renderErrors('email')}

                        <Item fixedLabel>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                        {this.renderErrors('password')}
                        {this.renderErrors('firebase')}

                        <View style={styles.actionContainer}>
                            {this.renderButton()}
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = {
    errorText: {
        paddingLeft: 15,
        color: 'red'
    },
    actionContainer: {
        paddingTop: 40
    }
};

const mapStateToProps = ({ user }) => {
    return { user };
};

export default connect(mapStateToProps, { loginUserSuccess })(LoginForm);
