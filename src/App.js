import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Config from 'react-native-config';

import reducers from './reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    componentWillMount() {
        var config = {
            apiKey: Config.FIREBASE_API_KEY,
            authDomain: Config.FIREBASE_AUTH_DOMAIN,
            databaseURL: Config.FIREBASE_DATABASE_URL,
            projectId: Config.FIREBASE_PROJECT_ID,
            storageBucket: Config.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
