import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import firebase from 'firebase';

import { scanFetchSuccess } from '../actions';

class PetScanDetail extends Component {
    componentWillMount() {
        const _this = this;
        this.setState({
          loading: true,
          error: ''
        });

        // Get pet's scans from db, update state
        console.log('scans/' + this.props.pet._id + '/' + this.props.scanId);
        var petScanRef = firebase.database().ref('scans/' + this.props.pet._id + '/' + this.props.scanId);
        petScanRef.once('value')
            .then(function(snapshot) {
                console.log('Got pet scan', snapshot.val());
                _this.props.scanFetchSuccess(snapshot.val());
                _this.setState({
                  loading: false,
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

    render() {
        const {
          name,
          image
        } = this.props.pet;
        const {
          location,
          created_at
        } = this.props.scan;

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
                                    <Text>{location.street_address}</Text>
                                    <Text note>{location.city}, {location.state}</Text>
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


const mapStateToProps = state => {
    return {
      pet: state.pets.selected,
      scan: state.scans.one,
    };
};

export default connect(mapStateToProps, { scanFetchSuccess })(PetScanDetail);
