import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Spinner } from 'native-base';
import moment from 'moment';
import firebase from 'firebase';

import { scansFetch } from '../actions';

class PetScanList extends Component {

    componentWillMount() {
        this.props.scansFetch({ petId: this.props.pet._id });
    }

    renderContent() {
        const { scans } = this.props;

        if(scans.loading) {
            const { height: screenHeight } = Dimensions.get('window');

            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center'}}>
                    <Spinner color='blue' />
                </View>
            );
        }

        // TODO Display 'No recent scans' message if scans.length = 0

        return <List dataArray={scans.all} renderRow={this.renderRow} />;
    }

    renderRow(scan) {
        const { created_at, location, _id } = scan;

        return(
            <ListItem>
                <Body>
                    <Text>{location.street_address}</Text>
                    <Text note>{location.city}, {location.state}</Text>
                    <Text note>{moment(created_at).fromNow()}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => Actions.pet_scan_detail({ scanId: _id })}>
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
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Scan History</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ scans }) => {
    return { scans };
};

export default connect(mapStateToProps, { scansFetch })(PetScanList);
