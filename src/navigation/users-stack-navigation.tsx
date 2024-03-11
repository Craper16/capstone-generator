import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UsersDashboard, {Employee, User} from '../screens/users-dashboard';
import UserDetailsScreen from '../screens/user-details-screen';
import AddEditUserOrEmployeeScreen from '../screens/add-edit-user-or-employee-screen';
import BillingAfterChoosingUser from '../screens/billing-after-choosing-user';

export type UsersStackNavigationParams = {
  UsersDashboard: undefined;
  AddUserOrEmployee: {user?: User; employee?: Employee};
  UserDetails: {user: User};
  BillingAfterChoosingUser: {user: User};
};

const UsersStackNavigator = createStackNavigator<UsersStackNavigationParams>();

export default function UsersStackNavigation() {
  return (
    <UsersStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <UsersStackNavigator.Screen
        name="UsersDashboard"
        component={UsersDashboard}
      />
      <UsersStackNavigator.Screen
        name="AddUserOrEmployee"
        component={AddEditUserOrEmployeeScreen}
      />
      <UsersStackNavigator.Screen
        name="UserDetails"
        component={UserDetailsScreen}
      />
      <UsersStackNavigator.Screen
        name="BillingAfterChoosingUser"
        component={BillingAfterChoosingUser}
      />
    </UsersStackNavigator.Navigator>
  );
}
