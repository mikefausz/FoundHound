import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Form, Item, Label, Input, Text, Button, Icon } from 'native-base';

class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = props.user
    }

    render() {
        const {
            first_name,
            last_name,
            image,
            street,
            city,
            state,
            zip_code,
            home_phone,
            mobile_phone,
            work_phone,
            email,
            veterinarian
        } = this.state;

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
                    <Form>
                        <Item fixedLabel>
                            <Label>First Name</Label>
                            <Input
                                onChangeText={first_name => this.setState({ first_name })}
                                value={first_name}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Last Name</Label>
                            <Input
                                onChangeText={last_name => this.setState({ last_name })}
                                value={last_name}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Street Address</Label>
                            <Input
                                onChangeText={street => this.setState({ street })}
                                value={street}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>City</Label>
                            <Input
                                onChangeText={city => this.setState({ city })}
                                value={city}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>State</Label>
                            <Input
                                onChangeText={state => this.setState({ state })}
                                value={state}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Home Phone</Label>
                            <Input
                                onChangeText={home_phone => this.setState({ home_phone })}
                                value={home_phone}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Mobile Phone</Label>
                            <Input
                                onChangeText={mobile_phone => this.setState({ mobile_phone })}
                                value={mobile_phone}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Work Phone</Label>
                            <Input
                                onChangeText={work_phone => this.setState({ work_phone })}
                                value={work_phone}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={email => this.setState({ email })}
                                value={email}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Veterinarian</Label>
                            <Input
                                onChangeText={veterinarian => this.setState({ veterinarian })}
                                value={veterinarian}
                            />
                        </Item>
                        <Button block onPress={() => Actions.profile_detail()}>
                            <Text>Save</Text>
                        </Button>
                        <Button block danger onPress={() => Actions.profile_detail()}>
                            <Text>Cancel</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default ProfileEdit;
