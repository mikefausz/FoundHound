import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Landing from './components/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PetScanner from './components/PetScanner';
import PetFound from './components/PetFound';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetScanList from './components/PetScanList';
import PetScanDetail from './components/PetScanDetail';
import PetCreate from './components/PetCreate';
import PetCreateScan from './components/PetCreateScan';
import ProfileEdit from './components/ProfileEdit';
import NavigationDrawer from './components/NavigationDrawer';

const RouterComponent = () => {
    return (
        <Router hideNavBar>

            <Scene key="root">

                <Scene key="auth" hideNavBar initial={true}>
                    <Scene
                        key="landing"
                        component={Landing} />
                    <Scene
                        key="login"
                        component={Login} />
                    <Scene
                        key="sign_up"
                        component={SignUp} />
                </Scene>

                <Scene key="drawer" component={NavigationDrawer} open={false} hideNavBar>
                    <Scene key="main" tabs={true}>
                        <Scene
                            key="pet_list"
                            component={PetList} />
                        <Scene
                            key="pet_detail"
                            component={PetDetail} />
                        <Scene
                            key="pet_scan_list"
                            component={PetScanList} />
                        <Scene
                            key="pet_scan_detail"
                            component={PetScanDetail} />
                        <Scene
                            key="pet_create"
                            component={PetCreate} />
                        <Scene
                            key="pet_create_scan"
                            component={PetCreateScan} />
                        <Scene
                            key="pet_edit"
                            component={PetCreate} />
                        <Scene
                            key="pet_scan"
                            component={PetScanner} />
                        <Scene
                            key="profile_edit"
                            component={ProfileEdit} />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
