import React, { Component } from 'react';
import NFC, { NfcDataType, NdefRecordType } from 'react-native-nfc';
import { View, Image, ToastAndroid, DeviceEventEmitter } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Icon, H2, Thumbnail } from 'native-base';
import Config from 'react-native-config';
import firebase from 'firebase';

class PetScanner extends Component {

    componentDidMount(){
        NFC.addListener(payload => {

            // Iterate over messages in tag data
            let messages = payload.data;
            for (let i in messages) {

                // Iterate over records in message
                let records = messages[i];
                for (let j in records) {

                    let r = records[j];
                    if (r.type === NdefRecordType.TEXT) {
                        const tagId = r.data;

                        ToastAndroid.show(
                            `Found tag ${tagId}, retrieving information...`,
                            ToastAndroid.SHORT
                        );

                        // Get pet ID associated with tag
                        const tagPetRef = firebase.database().ref(`pets_by_tag/${tagId}`);
                        tagPetRef.once('value')
                            .then(petSnapshot => {
                                const pet = petSnapshot.val();

                                console.log(petSnapshot);
                                console.log(petSnapshot.val());

                                ToastAndroid.show(
                                    `Found pet ${pet._id}! We have notified the owner.`,
                                    ToastAndroid.SHORT
                                );

                                // Send pet owner scan notification
                                const ownerRef = firebase.database().ref(`users/${pet.owner_id}/fcm_registration_id`);
                                ownerRef.once('value')
                                    .then(fcmTokenSnapshot => {
                                        const fcmToken = fcmTokenSnapshot.val();
                                        const req = {
                                             notification: {
                                                 title: 'Hey Mister!',
                                                 body: 'We found your dog!'
                                             },
                                             to: fcmToken
                                        };
                                        console.log('req', req);
                                        fetch('https://fcm.googleapis.com/fcm/send', {
                                            method: 'POST',
                                            headers: {
                                                'Authorization': `key=${Config.FIREBASE_MESSAGING_SERVER_ID}`,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(req)
                                        })
                                        .then((res) => {
                                            console.log('Send FCM notification RESPONSE:', res);
                                        });
                                    });

                                // TODO Write new scan to db

                                // TODO Redirect
                            })
                            .catch(error => {
                                ToastAndroid.show(
                                    `Sorry! There was an error getting pet: ${error}.`,
                                    ToastAndroid.SHORT
                                );
                            });
                    }
                    else {
                        ToastAndroid.show(
                            `Non-TEXT tag of type ${r.type} with data ${r.data}`,
                            ToastAndroid.SHORT
                        );
                    }
                }
            }
        });
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
                        <Title>Scan a Pet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true} contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <H2 style={{ textAlign: 'center' }}>Please hold device to back of dogs neck.</H2>
                    <Thumbnail large square source={{ uri: 'http://www.gizchina.com/wp-content/uploads/images/what-is-nfc.png'}} />
                </Content>
            </Container>
        );
    }
}

export default PetScanner;
