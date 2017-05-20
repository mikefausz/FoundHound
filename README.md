FoundHound
==========

## Setup

First install dependencies with `npm start`.

We will eventually use Auth 0's Passwordless auth system via `react-native-lock`, 
but for now I've added a simple login with Firebase. Either ask me for my app credentials, 
or create your own Firebase app with email/password authentication and add the web credentials to an 
`.env.dev` file in the root directory. You can also create `.env.staging` and `.env.prod` for 
different environment configurations.

```
FIREBASE_API_KEY={apiKey}
FIREBASE_AUTH_DOMAIN={authDomain}
FIREBASE_DATABASE_URL={datebaseUrl}
FIREBASE_PROJECT_ID={projectId}
FIREBASE_STORAGE_BUCKET={storageBucket}
FIREBASE_MESSAGING_SENDER_ID={messagingSenderId}
```

Then you should be ready to run the project on an Android [device](https://facebook.github.io/react-native/releases/0.23/docs/running-on-device-android.html#content)
or [emulator](https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html).

When you have a device connected or an emulator running, use `npm run android-dev` to start the project. 
You'll find other run scripts in the `package.json`.
