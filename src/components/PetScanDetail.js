import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import firebase from 'firebase';

import { scanFetch } from '../actions';

class PetScanDetail extends Component {

    componentDidMount() {
        this.props.scanFetch({ petId: this.props.pet._id, scanId: this.props.scanId });
    }

    render() {
        const {
            name,
            image
        } = this.props.pet;
        const {
            location,
            created_at
        } = this.props.scan.selected;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{name} Scan Detail</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder={true}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header>
                            <Left>
                                <Thumbnail source={{ uri: image}} />
                                <Body>
                                    <Text>{location && location.street_address}</Text>
                                    <Text note>{location && location.city}, {location && location.state}</Text>
                                    <Text note>{moment(created_at).fromNow()}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ pet, scan }) => {
    return {
        pet: pet.selected,
        scan
    };
};

export default connect(mapStateToProps, { scanFetch })(PetScanDetail);
