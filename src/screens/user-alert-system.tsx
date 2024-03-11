import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/colors';
import ScreenHeader from '../components/ui/screen-header';
import Card from '../components/ui/card';
import ListSeperator from '../components/ui/list-seperator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackNavigatorParams} from '../navigation/home-stack-navigation';
import {DUMMY_USERS, User} from './users-dashboard';
import UserAlertItem from '../components/ui/user-alert-item';

type UserAlertSystemProps = StackScreenProps<
  HomeStackNavigatorParams,
  'UserAlertSystem'
>;

export type Alert = {
  id: number;
  user: User;
  owner: string;
  user_description: string;
  owner_description: string;
  owner_reply: string;
  urgent: boolean;
  title: string;
  date: Date;
};

export const DUMMY_ALERTS: Alert[] = [
  {
    id: 1,
    owner: 'Samira',
    owner_description: 'Description',
    owner_reply: 'REplied here',
    urgent: true,
    user: DUMMY_USERS[0],
    user_description: 'Shou bed',
    title: 'Djontirrr',
    date: new Date(),
  },
  {
    id: 2,
    owner: 'Samira',
    owner_description: 'Description',
    owner_reply: 'REplied here',
    urgent: true,
    user: DUMMY_USERS[0],
    user_description: 'Shou bed',
    title: 'Djontirrr',
    date: new Date(),
  },
  {
    id: 3,
    owner: 'Samira',
    owner_description: 'Description',
    owner_reply: 'REplied here',
    urgent: true,
    user: DUMMY_USERS[0],
    user_description: 'Shou bed',
    title: 'Djontirrrdsa',
    date: new Date(),
  },
];

const UserAlertSystem = ({}: UserAlertSystemProps) => {
  const insets = useSafeAreaInsets();

  const [usersType, setUsersType] = useState<'users' | 'employees'>('users');
  const [filter, setFilter] = useState<'urgent' | 'not_urgent' | null>(null);

  return (
    <View style={styles.screen}>
      <ScreenHeader>Alert System</ScreenHeader>
      <View style={styles.topItemsContainer}>
        <Card
          selected={usersType === 'employees'}
          onPress={() => setUsersType('employees')}>
          <Text style={styles.topItemText}>Employee</Text>
        </Card>
        <Card
          selected={usersType === 'users'}
          onPress={() => setUsersType('users')}>
          <Text style={styles.topItemText}>Customer</Text>
        </Card>
      </View>
      <View
        style={[styles.historyContainer, {marginBottom: insets.bottom + 25}]}>
        <View style={styles.flatlistHeaderContainer}>
          <Card
            selected={filter === 'urgent'}
            style={[
              styles.historyTextContainer,
              {
                backgroundColor:
                  filter === 'urgent'
                    ? Colors.LightBlue
                    : Colors.SuperLightBlue,
              },
            ]}
            onPress={() => {
              if (filter === 'urgent') {
                return setFilter(null);
              }

              return setFilter('urgent');
            }}>
            <Text style={styles.historyTitle}>Urgent</Text>
          </Card>
          <Card
            selected={filter === 'not_urgent'}
            style={[
              styles.historyTextContainer,
              {
                backgroundColor:
                  filter === 'not_urgent'
                    ? Colors.LightBlue
                    : Colors.SuperLightBlue,
              },
            ]}
            onPress={() => {
              if (filter === 'not_urgent') {
                return setFilter(null);
              }

              return setFilter('not_urgent');
            }}>
            <Text style={styles.historyTitle}>Not Urgent</Text>
          </Card>
        </View>
        <FlatList
          data={DUMMY_ALERTS}
          ItemSeparatorComponent={ListSeperator}
          renderItem={props => <UserAlertItem {...props} />}
        />
      </View>
    </View>
  );
};

export default UserAlertSystem;

const styles = StyleSheet.create({
  flatlistHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    paddingBottom: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 15,
    gap: 15,
  },
  topItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  topItemText: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '700',
  },
  historyContainer: {
    backgroundColor: Colors.VeryLightBlue,
    padding: 10,
    borderRadius: 25,
    flex: 1,
  },
  historyTitle: {
    color: Colors.Black,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24 * 1.2,
  },
  historyTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 10,
    backgroundColor: Colors.SuperLightBlue,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  plusContainer: {
    backgroundColor: Colors.Blue,
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
