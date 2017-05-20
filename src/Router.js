import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PetScanner from './components/PetScanner';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetEdit from './components/PetEdit';
import ProfileDetail from './components/ProfileDetail';
import ProfileEdit from './components/ProfileEdit';
import NavigationDrawer from './components/NavigationDrawer';

const RouterComponent = () => {
    return (
        <Router hideNavBar>
            <Scene key="auth" hideNavBar initial={true}>
                <Scene
                    key="login"
                    component={LoginForm}
                />
            </Scene>
            
            <Scene key="drawer" component={NavigationDrawer} open={false} hideNavBar>
                <Scene key="main" tabs={true}>
                    <Scene
                        key="pet_list"
                        component={PetList}
                    />
                    <Scene
                        key="pet_detail"
                        component={PetDetail}
                    />
                    <Scene
                        key="pet_edit"
                        component={PetEdit}
                    />
                    <Scene
                        key="pet_scan"
                        component={PetScanner}
                    />
                    <Scene
                        key="profile_detail"
                        component={ProfileDetail}
                    />
                    <Scene
                        key="profile_edit"
                        component={ProfileEdit}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
