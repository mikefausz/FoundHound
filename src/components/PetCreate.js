import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Container, Content, Header, Left, Body, Right, Title, Form, Item, Label, Input, Text, Button, Icon } from 'native-base';

class PetCreate extends Component {
    constructor(props) {
        super(props);

        // EDIT
        // If pet provided, fill inputs with current value
        if(props.pet) {
            this.state = props.pet;
        }
        // CREATE
        // No pet provided, initialize values
        else {
            this.state = {
                name: '',
                age: '',
                breed: '',
                color: '',
                vaccinations: '',
                illnesses: ''
            }
        }

        this.state.loading = false;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.pet !== nextProps.pet) {
          this.setState(nextProps.pet);
        }
    }

    submitForm() {
        // TODO Validate form

        // TODO Pull in actual user ID
        const userPetsRef = firebase.database().ref('pets/uBT0kMeeBZXRSCkrxi6GYFcLgtO2');
        // const userPetsRef = firebase.database().ref(`pets/${this.props.user._id}`);

        if(this.props.name == 'pet_create') {
            const newPetRef = userPetsRef.push();
            console.log(newPetRef);
            newPetRef.set({ ...this.state, _id: newPetRef.key })
                .then(() => {
                    console.log('SUCCESS');
                    Actions.pet_detail({ pet: this.state });
                }).catch((err) => {
                    console.log('ERROR', err);
                });
        }
        else {
            const editPetRef = userPetsRef.child(this.state.pet.$id);
            editPetRef.set(this.state)
                .then((data) => {
                    console.log('SUCCESS', data);
                    Actions.pet_detail({ pet: this.state });
                }).catch((err) => {
                    console.log('ERROR', err);
                });
        }
    }

    cancel() {
        if(this.props.name =='pet_create') {
            Actions.pet_list();
        }
        else {
            Actions.pet_detail({ pet: this.state });
        }
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
                        <Title>{ this.props.name == 'pet_create' ? 'Add New Pet' : 'Edit Pet Profile' }</Title>
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
                            <Label>Color</Label>
                            <Input
                                onChangeText={color => this.setState({ color })}
                                value={color}
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
                        <Button block onPress={() => this.submitForm()}>
                            <Text>Save</Text>
                        </Button>
                        <Button block danger onPress={() => this.cancel()}>
                            <Text>Cancel</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
      pet: state.pets.selected
    };
};

export default connect(mapStateToProps)(PetCreate);
