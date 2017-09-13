import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Spinner } from 'native-base';
import firebase from 'firebase';

import { petsFetch } from '../actions';

class PetList extends Component {

    componentWillMount() {
        this.props.petsFetch({ userId: this.props.user._id });
    }

    renderContent() {
        const { pets } = this.props;

        if(pets.loading) {
            const { height: screenHeight } = Dimensions.get('window');

            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center'}}>
                    <Spinner color='blue' />
                </View>
            );
        }

        // TODO Display 'No pets added' message if pets.length = 0

        return (
            <List dataArray={pets.all}
                 renderRow={(pet) => {
                     const { name, age, breed, image } = pet;

                     return(
                         <ListItem avatar onPress={() => Actions.pet_detail({ petId: pet._id })}>
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
                 }}
            />
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
                    <Right>
                        <Button transparent onPress={() => Actions.pet_create()}>
                            <Text>Add Pet</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, pets }) => {
    return {
        user: auth.user,
        pets
    };
};

export default connect(mapStateToProps, { petsFetch })(PetList);
