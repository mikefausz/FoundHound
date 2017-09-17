import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Spinner } from 'native-base';

import { Colors, Fonts } from '../config/styles';
import { getUser } from '../actions';

class Landing extends Component {

    componentDidMount() {
        AsyncStorage.getItem('user_id')
        .then((value) => {
            if(value) {
                this.props.getUser(value);
            }
            else {
                Actions.login();
            }
        })
        .done();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.user) {
            Actions.drawer();
        }
    }

    render() {
        const {
            containerStyle,
            brandContainerStyle,
            brandTextStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <View style={brandContainerStyle}>
                    <Text style={brandTextStyle}>
                        FoundHound
                    </Text>
                    <Image source={ require('../assets/img/found-hound_glass.png') } />
                </View>
                <Spinner />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.blueLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    brandTextStyle: {
        color: Colors.white,
        fontSize: 36,
        fontFamily: 'Baloo-Regular'
    }
});

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { getUser })(Landing);
