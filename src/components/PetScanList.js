import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Right, Body, Spinner } from 'native-base';
import moment from 'moment';
import firebase from 'firebase';
import { scansFetchSuccess } from '../actions';

class PetScanList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: ''
        }
    }

    componentWillMount() {
        const _this = this;
        this.setState({
          loading: true,
          error: ''
        });

        // Get pet's scans from db, update state
        var petScansRef = firebase.database().ref('scans/' + this.props.pet._id);
        petScansRef.once('value')
            .then(function(snapshot) {
                console.log('Got pet scans', snapshot.val());
                _this.props.scansFetchSuccess(snapshot.val());
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

    renderContent() {
        if(this.state.loading) {
            const { height: screenHeight } = Dimensions.get('window');

            return (
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center'}}>
                    <Spinner color='blue' />
                </View>
            );
        }

        // TODO Display 'No recent scans' message if scans.length = 0
        
        return <List dataArray={this.props.scans} renderRow={this.renderRow} />;
    }

    renderRow(scan) {
        const { created_at, location } = scan;

        return(
            <ListItem>
                <Body>
                    <Text>{location.street_address}</Text>
                    <Text note>{location.city}, {location.state}</Text>
                    <Text note>{moment(created_at).fromNow()}</Text>
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
                    {this.renderContent()}
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = state => {
  return { scans: state.scans };
};

export default connect(mapStateToProps, { scansFetchSuccess })(PetScanList);
