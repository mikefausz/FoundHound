import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Header, Left, Right, Body, Title, Icon, Spinner } from 'native-base';
import t from 'tcomb-form-native';

import { Colors, Fonts } from '../config/styles';
import formStyles from '../config/formStyles';
import { createUser } from '../actions';

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
            underlineColorAndroid: Colors.transparent,
            error: 'Enter a valid email address'
        },
        password: {
            placeholder: 'Password',
            placeholderTextColor: Colors.greyMedium,
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
            underlineColorAndroid: Colors.transparent,
            error: 'Password must be at least 6 characters'
        },
        confirmPassword: {
            placeholder: 'Confirm Password',
            placeholderTextColor: Colors.greyMedium,
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
            underlineColorAndroid: Colors.transparent,
            error: 'Passwords do not match'
        }
    }
};

class SignUp extends Component {
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
        if(this.props.auth.signUpError) {
            return <Text style={{ color: Colors.redError }}>{this.props.auth.signUpError}</Text>;
        }
        return;
    }

    renderButton() {
        if(this.props.auth.signUpLoading) {
            return <Spinner />;
        }
        return (
            <Button
                block
                style={{ marginTop: 20 }}
                onPress={()=> this.attemptSignUp()}>
                    <Text>Sign Up</Text>
            </Button>
        );
    }

    attemptSignUp() {
        var value = this.refs.form.getValue();
        if (value) {
            const { email, password } = value;
            this.props.createUser({ email, password });
        }
    }

    render() {
        const NewUser = t.struct({
            email: t.String,
            password: t.String,
            confirmPassword: t.String
        });

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
                    <Form
                        ref="form"
                        type={NewUser}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />

                    {this.renderServerError()}

                    {this.renderButton()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { createUser })(SignUp);
