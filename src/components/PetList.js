import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body } from 'native-base';
import firebase from 'firebase';
import { petsFetchSuccess } from '../actions';

class PetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        // TODO Get user's pets from API
    }

    renderRow(pet) {
        const { name, age, breed, image } = pet;

        return(
            <ListItem avatar onPress={() => Actions.pet_detail({ pet })}>
                <Left>
                    <Thumbnail source={{ uri: image }} />
                </Left>
                <Body>
                    <Text>{name}</Text>
                    <Text note>{breed}</Text>
                </Body>
                <Right>
                    <Text note>{age} year{age > 1 ? 's' : ''} old</Text>
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Your Pets</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List dataArray={this.props.pets} renderRow={this.renderRow} />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { pets: state.pets };
};

export default connect(mapStateToProps, { petsFetchSuccess })(PetList);
