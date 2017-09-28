import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Platform } from 'react-native';
import { Container, Content, Header, Left, Body, Thumbnail, Right, Title, Text, Button, Icon, Spinner, View } from 'native-base';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

import { Colors, Fonts } from '../config/styles';
import formStyles from '../config/formStyles';
import selectTemplate from './Select';
import { saveUser, setProfilePicture } from '../actions';
import stateData from '../config/stateData.json';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Form = t.form.Form;
const options = {
    stylesheet: formStyles,
    fields: {
        first_name: {
            placeholder: 'First Name',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'email-address',
            underlineColorAndroid: Colors.transparent
        },
        last_name: {
            placeholder: 'Last Name',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        street: {
            placeholder: 'Address',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        city: {
            placeholder: 'Address',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        state: {
            template: selectTemplate
        },
        zip_code: {
            placeholder: 'Zip Code',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'phone-pad',
            underlineColorAndroid: Colors.transparent
        },
        mobile_phone: {
            placeholder: 'Mobile Phone',
            placeholderTextColor: Colors.greyMedium,
            keyboardType: 'phone-pad',
            underlineColorAndroid: Colors.transparent
        },
        email: {
            editable: false
        }
    }
};

class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUri: '',
            isGettingImage: false,
            value: props.auth.user
        };
    }

    onChange(value) {
        this.setState({ value });
    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let uploadBlob = null;

            const imageRef = firebase.storage().ref('images_user').child(`${this.props.auth.user._id}.jpg`);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime });
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getImage() {
        const _this = this;

        this.setState({ isGettingImage: true });
        const options = {
            title: 'Select Profile Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Image Picker Response:', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({ isGettingImage: false });
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({ isGettingImage: false });
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                this.setState({ isGettingImage: false });
            }
            else {
                this.uploadImage(response.uri)
                    .then(url => {
                        this.setState({ imageUri: url, isGettingImage: false });

                        // TODO Maybe put this in a Redux flow
                        this.props.setProfilePicture(url);

                        const userRef = firebase.database().ref(`users/${this.props.auth.user._id}/image`);
                        userRef.set(url)
                            .then(() => {
                                console.log('Save Profile Picture SUCCESS');
                            })
                            .catch((err) => {
                                console.log('Save Profile Picture ERROR', err);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ isGettingImage: false });
                    });
            }
        });
    }

    renderServerError() {
        if(this.props.auth.saveError) {
            return <Text style={{ color: Colors.redError }}>{this.props.auth.saveError}</Text>;
        }
        return;
    }

    renderSaveButton() {
        if(this.props.auth.saveLoading) {
            return <Spinner />;
        }
        return (
            <Button
                block
                style={{ marginTop: 20 }}
                onPress={()=> this.attemptSaveUser()}>
                    <Text>Save</Text>
            </Button>
        );
    }

    renderImagePickerButton() {
        if(this.state.isGettingImage) {
            return <Spinner />
        }
        return (
            <Button
                transparent
                info
                style={{ alignSelf: 'center', marginBottom: 20, marginBottom: 20 }}
                onPress={() => this.getImage()}>
                    <Text>Change Profile Picture</Text>
            </Button>
        );
    }

    attemptSaveUser() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log('form value', value);
            const user = {
                _id: this.props.auth.user._id,
                first_name: value.first_name,
                last_name: value.last_name,
                street: value.street,
                city: value.city,
                state: value.state,
                zip_code: value.zip_code,
                mobile_phone: value.mobile_phone,
                email: value.email,
                image: this.state.imageUri || this.props.auth.user.image
            };
            this.props.saveUser(user);
        }
    }

    render() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const EmailType = t.refinement(t.String, function (email) { return emailRegex.test(email); });
        const PhoneType = t.refinement(t.Number, value => {
            return parseInt(value) > 999999999;
        });
        const ZipType = t.refinement(t.Number, value => {
            return parseInt(value) > 9999;
        });
        var State = t.enums(stateData);

        const UserProfile = t.struct({
            first_name: t.String,
            last_name: t.String,
            street: t.String,
            city: t.String,
            state: State,
            zip_code: ZipType,
            mobile_phone: PhoneType,
            email: EmailType
        });

        const { imageUri, value } = this.state;

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
                    <Thumbnail
                        large
                        style={{ alignSelf: 'center', marginTop: 20 }}
                        source={{ uri: imageUri || this.props.auth.user.image || '../assets/img/default-avatar.png' }} />

                    {this.renderImagePickerButton()}

                    <Form
                        ref="form"
                        type={UserProfile}
                        options={options}
                        value={value}
                        onChange={this.onChange.bind(this)}
                    />

                    {this.renderServerError()}

                    {this.renderSaveButton()}

                    <View style={{ height: 20}} />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { saveUser, setProfilePicture })(ProfileEdit);
