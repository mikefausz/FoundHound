import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Spinner } from 'native-base';
import firebase from 'firebase';
import { petsFetchSuccess, petSelect } from '../actions';

class PetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: ''
        }
    }

    componentWillMount() {
        const _this = this;
        this.setState({
          loading: true,
          error: ''
        });

        // Get user's pets from db, update state
        var userPetsRef = firebase.database().ref('pets/' + this.props.user._id);
        userPetsRef.once('value')
            .then(function(snapshot) {
                console.log('Got user pets', snapshot.val());
                _this.props.petsFetchSuccess(snapshot.val());
                _this.setState({
                  loading: false
                });
            })
            .catch((error) => {
                console.log('ERROR', error);
                _this.setState({
                  loading: false,
                  error
                });
            });
    }

    renderContent() {
        if(this.state.loading) {
            const { height: screenHeight } = Dimensions.get('window');

            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center'}}>
                    <Spinner color='blue' />
                </View>
            );
        }

        // TODO Display 'No pets added' message if pets.length = 0

        return <List dataArray={this.props.pets}
                     renderRow={(pet) => {
                         const { name, age, breed, image } = pet;

                         return(
                             <ListItem avatar onPress={() => this.onRowPress(pet)}>
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
              />;
    }

    onRowPress(pet) {
      this.props.petSelect(pet);
      Actions.pet_detail();
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
      pets: pets.all
    };
};

export default connect(mapStateToProps, { petsFetchSuccess, petSelect })(PetList);
