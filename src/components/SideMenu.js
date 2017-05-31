import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Thumbnail, Badge, Left, Body, Right, Footer, H3 } from 'native-base';

class SideMenu extends Component {
    render() {
        const { user } = this.props;

        return (
            <Container>
                <Content>
                    <View style={styles.headerStyle}>
                        <Thumbnail large source={{ uri:'https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png' }} />
                        <H3 style={{ color: '#fff' }}>{user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email}</H3>
                    </View>

                    <List>
                        <ListItem icon onPress={()=> Actions.pet_scan()}>
                            <Left>
                                <Icon name="qr-scanner" />
                            </Left>
                            <Body>
                              <Text>Scan a Pet</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> Actions.pet_list()}>
                            <Left>
                                <Icon name="paw" />
                            </Left>
                            <Body>
                                <Text>Your Pets</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> Actions.pet_create()}>
                            <Left>
                                <Icon name="add" />
                            </Left>
                            <Body>
                                <Text>Add Pet</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> Actions.profile_detail()}>
                            <Left>
                                <Icon name="person" />
                            </Left>
                            <Body>
                                <Text>Your Profile</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> Actions.auth()}>
                            <Left>
                                <Icon name="log-out" />
                            </Left>
                            <Body>
                                <Text>Sign Out</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = {
    headerStyle: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingBottom: 16,
        paddingRight: 16,
        justifyContent: 'space-between',
        height: 160,
        backgroundColor: '#3F51B5'
    }
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, null)(SideMenu);
