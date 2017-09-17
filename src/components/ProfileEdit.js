import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Text, Button, Icon, Spinner } from 'native-base';
import t from 'tcomb-form-native';

import { Colors, Fonts } from '../config/styles';
import formStyles from '../config/formStyles';
import selectTemplate from './Select';
import { saveUser } from '../actions';
import stateData from '../config/stateData.json';

const Form = t.form.Form;
const options = {
    stylesheet: formStyles,
    fields: {
        first_name: {
            placeholder: 'First Name',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'email-address',
            underlineColorAndroid: Colors.transparent
        },
        last_name: {
            placeholder: 'Last Name',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        street: {
            placeholder: 'Address',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        city: {
            placeholder: 'Address',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        state: {
            template: selectTemplate
        },
        zip_code: {
            placeholder: 'Zip Code',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'phone-pad',
            underlineColorAndroid: Colors.transparent
        },
        mobile_phone: {
            placeholder: 'Mobile Phone',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'phone-pad',
            underlineColorAndroid: Colors.transparent
        },
        email: {
            editable: false
        }
    }
};

class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.auth.user
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.user) {
            Actions.pop();
        }
    }

    onChange(value) {
        this.setState({ value });
    }

    renderServerError() {
        if(this.props.auth.saveError) {
            return <Text style={{ color: Colors.redError }}>{this.props.auth.saveError}</Text>;
        }
        return;
    }

    renderButton() {
        if(this.props.auth.saveLoading) {
            return <Spinner />;
        }
        return (
            <Button
                block
                style={{ marginTop: 20 }}
                onPress={()=> this.attemptSaveUser()}>
                    <Text>Save</Text>
            </Button>
        );
    }

    attemptSaveUser() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log('form value', value);
            const user = {
                _id: this.props.auth.user._id,
                first_name: value.first_name,
                last_name: value.last_name,
                street: value.street,
                city: value.city,
                state: value.state,
                zip_code: value.zip_code,
                mobile_phone: value.mobile_phone,
                email: value.email
            };
            this.props.saveUser(user);
        }
    }

    render() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const EmailType = t.refinement(t.String, function (email) { return emailRegex.test(email); });
        const PhoneType = t.refinement(t.Number, value => {
            return parseInt(value) > 999999999;
        });
        const ZipType = t.refinement(t.Number, value => {
            return parseInt(value) > 9999;
        });
        var State = t.enums(stateData);

        const UserProfile = t.struct({
            first_name: t.String,
            last_name: t.String,
            street: t.String,
            city: t.String,
            state: State,
            zip_code: ZipType,
            mobile_phone: PhoneType,
            email: EmailType
        });

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true}>
                    <Form
                        ref="form"
                        type={UserProfile}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />

                    {this.renderServerError()}

                    {this.renderButton()}

                    <Button
                        block
                        danger
                        style={{ marginTop: 20 }}
                        onPress={() => Actions.profile_detail()}>
                            <Text>Cancel</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { saveUser })(ProfileEdit);
