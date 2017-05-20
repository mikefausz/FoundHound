import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Form, Item, Label, Input, Text, Button, Icon } from 'native-base';

class PetEdit extends Component {
    constructor(props) {
        super(props);

        this.state = props.pet;
    }

    render() {
        const {
            name,
            breed,
            age,
            color,
            vaccinations,
            illnesses
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
                            <Label>Name</Label>
                            <Input
                                onChangeText={name => this.setState({ name })}
                                value={name}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Age</Label>
                            <Input
                                onChangeText={age => this.setState({ age })}
                                value={age}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Breed</Label>
                            <Input
                                onChangeText={breed => this.setState({ breed })}
                                value={breed}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Vaccinations</Label>
                            <Input
                                onChangeText={vaccinations => this.setState({ vaccinations })}
                                value={vaccinations}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Illnesses</Label>
                            <Input
                                onChangeText={illnesses => this.setState({ illnesses })}
                                value={illnesses}
                            />
                        </Item>
                        <Button block onPress={() => Actions.pet_detail({ pet: this.props.pet })}>
                            <Text>Save</Text>
                        </Button>
                        <Button block danger onPress={() => Actions.pet_detail({ pet: this.props.pet })}>
                            <Text>Cancel</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
};

export default PetEdit;
