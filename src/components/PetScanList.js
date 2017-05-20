import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body } from 'native-base';
import moment from 'moment';

import data from '../reducers/ScanList.json';

class PetScanList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scans: data
        }
    }

    componentWillMount() {
        // TODO Get pet's scan history from API
    }

    renderRow(scan) {
        const { timestamp, location } = scan;

        return(
            <ListItem avatar onPress={() => Actions.pet_detail({ pet })}>
                <Body>
                    <Text>{location.street_address}</Text>
                    <Text note>{location.city}, {location.state}</Text>
                    <Text note>{moment(timestamp).fromNow()}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                        <Icon name="arrow-forward" />
                    </Button>
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Scan History</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List dataArray={this.state.scans} renderRow={this.renderRow} />
                </Content>
            </Container>
        );
    }
}

export default PetScanList;
