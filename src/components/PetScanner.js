import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Icon, H2, Thumbnail } from 'native-base';

class PetScanner extends Component {
    scanPet() {
        return;
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
                    <Button full onPress={() => this.scanPet()}>
                        <Text>Scan Pet</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default PetScanner;
