import React, { Component } from 'react';
import NFC, { NfcDataType, NdefRecordType } from 'react-native-nfc';
import { View, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Icon, H2, Thumbnail } from 'native-base';
import firebase from 'firebase';

class PetCreateScan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error:''
        };
    }

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

                        this.setState({ loading: true, error: '' });

                        const { petId } = this.props.petId;
                        ToastAndroid.show(
                            `Found tag ${tagId}, linking to pet ${petId}...`,
                            ToastAndroid.SHORT
                        );

                        // Add pet ID to tag
                        const tagRef = firebase.database().ref(`tags/${tagId}`);
                        tagRef.child('pet_id').set(petId)
                            .then((data) => {
                                this.setState({ loading: false });
                                ToastAndroid.show(
                                    `Tag successfully linked to pet ${petId}!`,
                                    ToastAndroid.SHORT
                                );
                                console.log('SUCCESS', data);
                                Actions.pet_list();
                            }).catch((err) => {
                                console.log('ERROR', err);
                                this.setState({ loading: false, error: err });
                            });
                    }
                }
            }
        });
    }

    cancel() {
        Actions.pet_list();
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
                        <Title>Scan your Pet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true} contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <H2 style={{ textAlign: 'center' }}>Please hold device to back of dog's neck.</H2>
                    <Thumbnail large square source={{ uri: 'http://www.gizchina.com/wp-content/uploads/images/what-is-nfc.png'}} />
                </Content>
            </Container>
        );
    }
};

export default PetCreateScan;
