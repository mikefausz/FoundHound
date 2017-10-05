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

    // TODO Promisify this function
    attemptSavePet() {
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({ loading: true, error: '' });
            console.log('form value', value);
            console.log('state value', this.state.value);
            console.log('props', this.props);
            const { user, name, pet } = this.props;
            let tagId = this.props.tagId ? this.props.tagId : this.props.pet.tag_id;

            // Create new pet profile
            let newPet = {
                name: value.name,
                age: value.age,
                breed: value.breed,
                color: value.color,
                tag_id: tagId,
                owner_id: user._id
            };

            const userPetsRef = firebase.database().ref(`pets_by_user/${user._id}`);
            const tagRef = firebase.database().ref(`tags/${tagId}`);
            const tagPetRef = tagRef.child(`pet`);

            if(this.props.name == 'pet_create') {

                const newPetRef = userPetsRef.push();
                const newPetId = newPetRef.key;

                // Create pet under user ID
                console.log(newPetRef);
                newPetRef.set({ ...newPet, _id: newPetId })
                    .then(() => {
                        console.log('SUCCESS');
                        this.uploadImage(newPetId, this.state.imageUri)
                            .then(url => {

                                // Upload profile picture
                                const petImageRef = userPetsRef.child(`${newPetId}/image`);
                                petImageRef.set(url)
                                    .then(() => {
                                        console.log('Save Profile Picture SUCCESS');
                                        this.setState({ loading: false });
                                        Actions.pet_list();
                                    })
                                    .catch((err) => {
                                        console.log('Save Profile Picture ERROR', err);
                                        this.setState({ loading: false, error: err });
                                    });
                            });
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                        this.setState({ loading: false, error: err });
                    });

                // Add pet reference to tag object
                tagPetRef.set(newPet)
                    .then(() => {
                        console.log('SUCCESS');
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                    });

                // Set assigned_at on tag object
                tagRef.child('assigned_at').set(new Date().toISOString())
                    .then((data) => {
                        console.log('SUCCESS', data);
                    }).catch((err) => {
                        console.log('ERROR', err);
                    });
            }
            else {
                const editPetId = this.props.pet._id;
                const editUserPetRef = userPetsRef.child(editPetId);
                if(!this.state.imageUri) {
                    newPet.image = pet.image;
                }
                newPet._id = editPetId;

                // Save pet under user ID
                editUserPetRef.set(newPet)
                    .then((data) => {
                        console.log('SUCCESS', data);

                        // If changed, upload profile picture
                        if(this.state.imageUri) {
                            this.uploadImage(editPetId, this.state.imageUri)
                                .then(url => {

                                    const petImageRef = userPetsRef.child(`${editPetId}/image`);
                                    petImageRef.set(url)
                                        .then(() => {
                                            console.log('Save Profile Picture SUCCESS');
                                            this.setState({ loading: false });
                                            Actions.pet_list();
                                        })
                                        .catch((err) => {
                                            console.log('Save Profile Picture ERROR', err);
                                            this.setState({ loading: false, error: err });
                                        });
                                })
                        } else {
                            this.setState({ loading: false });
                            Actions.pet_list();
                        }
                    }).catch((err) => {
                        console.log('ERROR', err);
                        this.setState({ loading: false, error: err });
                    });

                // Save pet under tag ID
                tagPetRef.set(newPet)
                    .then((data) => {
                        console.log('SUCCESS', data);
                    }).catch((err) => {
                        console.log('ERROR', err);
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

    getDisplayImage() {
        const { pet } = this.props;

        if(this.state.imageDisplay) {
            return this.state.imageDisplay;
        }
        else if(pet && pet.image) {
            return pet.image;
        }
        else {
            return 'https://www.barkworthies.com/Themes/Barkworthies/Content/images/defult-dog.png';
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
                        <Title>Pet Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder={true}>
                    <Thumbnail
                        large
                        style={{ alignSelf: 'center', marginTop: 20 }}
                        source={{ uri: this.getDisplayImage() }} />

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

const mapStateToProps = ({ auth, pet }) => {
    return {
        user: auth.user,
        pet: pet.selected
    };
};

export default connect(mapStateToProps)(PetCreate);
