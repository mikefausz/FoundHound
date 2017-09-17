import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Header, Left, Right, Body, Title, Icon, Spinner } from 'native-base';
import t from 'tcomb-form-native';

import { Colors, Fonts } from '../config/styles';
import formStyles from '../config/formStyles';
import { loginUser } from '../actions';

const Form = t.form.Form;
const options = {
    stylesheet: formStyles,
    fields: {
        email: {
            placeholder: 'Email',
            placeholderTextColor: Colors.greyMedium,
            autoCapitalize: 'none',
            autoCorrect: false,
            keyboardType: 'email-address',
            underlineColorAndroid: Colors.transparent
        },
        password: {
            placeholder: 'Password',
            placeholderTextColor: Colors.greyMedium,
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
            underlineColorAndroid: Colors.transparent
        }
    }
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.user) {
            Actions.drawer();
        }
    }

    onChange(value) {
        this.setState({ value });
    }

    renderServerError() {
        if(this.props.auth.loginError) {
            return <Text style={{ color: Colors.redError }}>{this.props.auth.loginError}</Text>;
        }
        return;
    }

    renderButton() {
        if(this.props.auth.loginLoading) {
            return <Spinner />;
        }
        return (
            <Button
                block
                style={{ marginTop: 20 }}
                onPress={()=> this.attemptLogin()}>
                    <Text>Login</Text>
            </Button>
        );
    }

    attemptLogin() {
        var value = this.refs.form.getValue();
        if (value) {
            const { email, password } = value;
            this.props.loginUser({ email, password });
        }
    }

    render() {
        const User = t.struct({
            email: t.String,
            password: t.String
        });

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
                    <Form
                        ref="form"
                        type={User}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />

                    {this.renderServerError()}

                    {this.renderButton()}

                    <Button
                        block
                        info
                        transparent
                        style={{ marginTop: 20 }}
                        onPress={()=> Actions.sign_up()}>
                            <Text>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { loginUser })(Login);
