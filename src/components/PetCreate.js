import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Platform } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Thumbnail, Input, Text, Button, Icon, View, Spinner } from 'native-base';
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
        name: {
            placeholder: 'Name',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        age: {
            placeholder: 'Age',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        breed: {
            placeholder: 'Breed',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        color: {
            placeholder: 'Color',
            placeholderTextColor: Colors.greyMedium,
            underlineColorAndroid: Colors.transparent
        },
        state: {
            template: selectTemplate
        }
    }
};

class PetCreate extends Component {
    constructor(props) {
        super(props);

        console.log('props', props);
        // If pet provided, fill inputs with current value (edit)
        this.state = {
            value: props.pet ? props.pet : {},
            imageUri: '',
            imageDisplay: '',
            isGettingImage: false,
            error: '',
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.pet !== nextProps.pet) {
          this.setState(nextProps.pet);
        }
    }

    onChange(value) {
        this.setState({ value });
    }

    uploadImage(petId, uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let uploadBlob = null;

            const imageRef = firebase.storage().ref('images_pet').child(`${petId}.jpg`);

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
            title: 'Select Pet Photo',
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
                this.setState({
                    imageUri: response.uri,
                    imageDisplay: 'data:image/jpeg;base64,' + response.data,
                    isGettingImage: false
                }, () => {
                    console.log('Set image URI in state:', this.state);
                });
            }
        });
    }

    renderServerError() {
        if(this.state.error) {
            return <Text style={{ color: Colors.redError }}>{this.state.error}</Text>;
        }
        return;
    }

    renderSaveButton() {
        if(this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button
                block
                style={{ marginTop: 20 }}
                onPress={()=> this.attemptSavePet()}>
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

    attemptSavePet() {
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({ loading: true, error: '' });
            console.log('form value', value);

            const newPet = {
                name: value.name,
                age: value.age,
                breed: value.breed,
                color: value.color
            };

            // TODO Pull in actual user ID
            const userPetsRef = firebase.database().ref('pets/uBT0kMeeBZXRSCkrxi6GYFcLgtO2');
            // const userPetsRef = firebase.database().ref(`pets/${this.props.user._id}`);

            if(this.props.name == 'pet_create') {
                const newPetRef = userPetsRef.push();
                const newPetId = newPetRef.key;
                console.log(newPetRef);
                newPetRef.set({ ...newPet, _id: newPetId })
                    .then(() => {
                        console.log('SUCCESS');
                        this.uploadImage(newPetId, this.state.imageUri)
                            .then(url => {

                                const userRef = firebase.database().ref(`pets/uBT0kMeeBZXRSCkrxi6GYFcLgtO2/${newPetId}/image`);
                                userRef.set(url)
                                    .then(() => {
                                        console.log('Save Profile Picture SUCCESS');
                                        this.setState({ loading: false });
                                        Actions.pet_create_scan({ petId: newPetId });
                                    })
                                    .catch((err) => {
                                        console.log('Save Profile Picture ERROR', err);
                                        this.setState({ loading: false, error: err });
                                    });
                            })
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                        this.setState({ loading: false, error: err });
                    });
            }
            else {
                const editPetRef = userPetsRef.child(this.state.pet.$id);
                editPetRef.set(this.state)
                    .then((data) => {
                        console.log('SUCCESS', data);

                        // TODO Handle change photo
                        this.setState({ loading: false });
                        Actions.pet_detail({ pet: this.props.pet });
                    }).catch((err) => {
                        console.log('ERROR', err);
                        this.setState({ loading: false, error: err });
                    });
            }
        }
    }

    cancel() {
        if(this.props.name =='pet_create') {
            Actions.pet_list();
        }
        else {
            Actions.pet_detail({ pet: this.props.pet });
        }
    }

    render() {
        const PetProfile = t.struct({
            name: t.String,
            age: t.Number,
            breed: t.String,
            color: t.String
        });

        const { imageDisplay, value } = this.state;

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
                        source={{ uri: imageDisplay || 'https://www.barkworthies.com/Themes/Barkworthies/Content/images/defult-dog.png' }} />

                    {this.renderImagePickerButton()}

                    <Form
                        ref="form"
                        type={PetProfile}
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
};

const mapStateToProps = state => {
    return {
      pet: state.pet.selected
    };
};

export default connect(mapStateToProps)(PetCreate);
