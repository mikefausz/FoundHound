import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';

class ProfileDetail extends Component {
    componentWillMount() {
        // TODO Get user profile from API
    }

    render() {
        const {
          first_name,
          last_name,
          image,
          street,
          city,
          state,
          zip_code,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          veterinarian
        } = this.props.user;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.refresh({key: 'drawer', open: value => !value })}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Your Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header>
                            <Left>
                                <Thumbnail source={{ uri: image }} />
                                <Body>
                                  <Text>{first_name} {last_name}</Text>
                                  <Text note>{street}</Text>
                                  <Text note>{city}, {state} {zip_code}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Home Phone</Text>
                                <Text note>{home_phone}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Mobile Phone</Text>
                                <Text note>{mobile_phone}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Work Phone</Text>
                                <Text note>{work_phone}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Email</Text>
                                <Text note>{email}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Veterinarian</Text>
                                <Text note>{veterinarian}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button block onPress={() => Actions.profile_edit({ user: this.props.user })}>
                                    <Text>Edit Profile</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, null)(ProfileDetail);
