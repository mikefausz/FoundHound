import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Spinner } from 'native-base';
import PushNotification from 'react-native-push-notification';
import Config from 'react-native-config';

import { petsFetch, setFCMToken } from '../actions';

class PetList extends Component {

    componentWillMount() {
        const { petsFetch, user } = this.props;

        petsFetch({ userId: user._id });

        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );

                // Save token to user
                setFCMToken(user, token.token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
                if(notification.foreground) {
                    Alert.alert(notification['gcm.notification.title'], notification['gcm.notification.body']);
                }
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: Config.FIREBASE_MESSAGING_SENDER_ID,

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    }

    renderContent() {
        const { pets } = this.props;
        const { height: screenHeight } = Dimensions.get('window');

        if(pets.loading) {
            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center'}}>
                    <Spinner />
                </View>
            );
        }

        else if(pets.all === null || pets.all.length === 0) {
            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>You haven't added any pets.</Text>
                </View>
            );
        }

        return (
            <List dataArray={pets.all}
                 renderRow={(pet) => {
                     const { name, age, breed, image, _id } = pet;

                     return(
                         <ListItem avatar onPress={() => Actions.pet_detail({ petId: _id })}>
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
                        <Button transparent onPress={() => Actions.pet_create_scan()}>
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

export default connect(mapStateToProps, { petsFetch, setFCMToken })(PetList);
