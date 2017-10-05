import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Thumbnail, Badge, Left, Body, Right, Footer, H3 } from 'native-base';

class SideMenu extends Component {
    signOut() {
        AsyncStorage.removeItem('user_id');
        Actions.auth();
    }

    renderContent() {
        if(this.props.user) {
            const {
              first_name,
              last_name,
              email,
              image
            } = this.props.user;

            return (
                <Content>
                    <View style={styles.headerStyle}>
                        <Thumbnail large source={{ uri: image || '../assets/img/default-avatar.png' }} />
                        <H3 style={{ color: '#fff' }}>{first_name && last_name ? `${first_name} ${last_name}` : email}</H3>
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
                        <ListItem icon onPress={()=> Actions.pet_create_scan()}>
                            <Left>
                                <Icon name="add" />
                            </Left>
                            <Body>
                                <Text>Add Pet</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> Actions.profile_edit()}>
                            <Left>
                                <Icon name="person" />
                            </Left>
                            <Body>
                                <Text>Your Profile</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem icon onPress={()=> this.signOut()}>
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
            );
        }
        return;
    }
    render() {
        return (
            <Container>
                {this.renderContent()}
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

const mapStateToProps = ({ auth }) => {
  return { user: auth.user };
};

export default connect(mapStateToProps, null)(SideMenu);
