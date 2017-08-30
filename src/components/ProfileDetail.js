import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';

class ProfileDetail extends Component {
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

        // TODO Cleaner placeholders than 'Not given'
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
                                <Thumbnail source={{ uri: image || 'https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png'}} />
                                <Body>
                                  <Text>{first_name || 'Not given'} {last_name || 'Not given'}</Text>
                                  <Text note>{street || 'Not given'}</Text>
                                  <Text note>{city || 'Not given'}, {state || 'Not given'} {zip_code || 'Not given'}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Home Phone</Text>
                                <Text note>{home_phone || 'Not given'}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Mobile Phone</Text>
                                <Text note>{mobile_phone || 'Not given'}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Work Phone</Text>
                                <Text note>{work_phone || 'Not given'}</Text>
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
                                <Text note>{veterinarian || 'Not given'}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button block onPress={() => Actions.profile_edit()}>
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

const mapStateToProps = ({ auth }) => {
  return { user: auth.user };
};

export default connect(mapStateToProps, null)(ProfileDetail);
