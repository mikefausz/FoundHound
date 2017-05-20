import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class PetDetail extends Component {
    markLost() {
        return;
    }

    render() {
        const { name, breed, age, image } = this.props.pet;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{name}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder={true}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header>
                            <Left>
                                <Thumbnail source={{ uri: image}} />
                                <Body>
                                    <Text>{name}</Text>
                                    <Text note>{breed}</Text>
                                    <Text note>{age} year{age > 1 ? 's' : ''} old</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Button transparent onPress={() => Actions.pet_edit({ pet: this.props.pet })}>
                                    <Icon name="create" />
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Color</Text>
                                <Text note>Brown</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Vaccinations</Text>
                                <Text note>All of em</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Illnesses</Text>
                                <Text note>Is an asshole</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button block onPress={() => Actions.pet_scan_list()}>
                                    <Text>See Scan History</Text>
                                </Button>
                                <Button block danger onPress={() => this.markLost()}>
                                    <Text>Mark as Lost</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default PetDetail;
