import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BillingManagement from '../screens/billing-management';
import {User} from '../screens/users-dashboard';
import UserDetailsScreen from '../screens/user-details-screen';
import BillingAfterChoosingUser from '../screens/billing-after-choosing-user';

export type BillingStackNavigatorParams = {
  BillingManagement: undefined;
  UserDetails: {user: User};
  BillingAfterChoosingUser: {user: User};
};

const BillingStackNavigator =
  createStackNavigator<BillingStackNavigatorParams>();

export default function BillingStackNavigation() {
  return (
    <BillingStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <BillingStackNavigator.Screen
        name="BillingManagement"
        component={BillingManagement}
      />
      <BillingStackNavigator.Screen
        name="UserDetails"
        component={UserDetailsScreen}
      />
      <BillingStackNavigator.Screen
        name="BillingAfterChoosingUser"
        component={BillingAfterChoosingUser}
      />
    </BillingStackNavigator.Navigator>
  );
}
