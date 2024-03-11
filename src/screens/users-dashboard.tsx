import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Card from '../components/ui/card';
import SearchTextInput from '../components/ui/search-text-input';
import ListSeperator from '../components/ui/list-seperator';
import EmployeeListItem from '../components/ui/employee-list-item';
import UserListItem from '../components/ui/user-list-item';
import {StackScreenProps} from '@react-navigation/stack';
import {UsersStackNavigationParams} from '../navigation/users-stack-navigation';

export const USERS_FILTERS = [
  'Pending',
  'Paid',
  'Role',
  'Date',
  'Alphabetical',
];

export interface User {
  id: number;
  name: string;
  amount_to_pay: number;
  paid: number;
  due_date: Date;
  address: string;
  remark: string;
  plan: '10Amp' | '5Amp' | '2Amp' | '20Amp';
  payment_type: 'fixed' | 'not_fixed';
  profile_picture: string | null;
  date_joined: Date;
  phone_number: number;
}

export interface Employee {
  id: number;
  name: string;
  permissions: string[];
  address: string;
  remark: string;
  salary: number;
  profile_picture: string | null;
  role: string;
}

export const DUMMY_USERS: User[] = [
  {
    id: 1,
    due_date: new Date('2024-03-13'),
    address: 'Hone',
    amount_to_pay: 100,
    name: 'Jamal',
    paid: 24,
    payment_type: 'fixed',
    plan: '10Amp',
    remark: 'Byentek?',
    profile_picture: null,
    date_joined: new Date('2024-01-30'),
    phone_number: 12312312,
  },
  {
    id: 2,
    due_date: new Date('2024-03-10'),
    address: 'Honike',
    amount_to_pay: 200,
    name: 'Kalvin',
    paid: 200,
    payment_type: 'fixed',
    plan: '20Amp',
    remark: 'Byentek ktirrrrrr yemken',
    profile_picture: null,
    date_joined: new Date('2024-01-30'),
    phone_number: 12312312,
  },
];

export const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: 1,
    address: 'Yemkten bl neit',
    name: 'Jeffrrey',
    permissions: ['admin', 'user', 'owner'],
    remark: 'Soo hes gay',
    salary: 1000,
    profile_picture: null,
    role: 'admin',
  },
  {
    id: 2,
    address: 'Yemkten bl neit',
    name: 'Jreeette',
    permissions: ['owner'],
    remark: 'Soo hes gay okey',
    salary: 2000,
    profile_picture: null,
    role: 'normal',
  },
];

type UsersDashboardProps = StackScreenProps<
  UsersStackNavigationParams,
  'UsersDashboard'
>;

const UsersDashboard = ({navigation}: UsersDashboardProps) => {
  const insets = useSafeAreaInsets();

  const [usersType, setUsersType] = useState<'users' | 'employees'>(
    'employees',
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <View
      style={styles.screen}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.topItemsContainer}>
        <View style={[styles.topTextContainer, {paddingTop: insets.top + 15}]}>
          <Text style={styles.titleText}>
            {usersType === 'users' ? 'Users' : 'Employees'}
          </Text>
        </View>
        <View style={styles.empUsersContainer}>
          <View />
          <Card
            onPress={() => setUsersType('employees')}
            style={styles.cardContainer}
            selected={usersType === 'employees'}>
            <Text style={styles.text}>Employees</Text>
          </Card>
          <Card
            onPress={() => setUsersType('users')}
            style={styles.cardContainer}
            selected={usersType === 'users'}>
            <Text style={styles.text}>Users</Text>
          </Card>
          <Pressable
            onPress={() => navigation.navigate('AddUserOrEmployee', {})}>
            <Text style={styles.addStyle}>+</Text>
          </Pressable>
        </View>
        <SearchTextInput value={searchQuery} setValue={setSearchQuery} />
        <View style={styles.h10} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={USERS_FILTERS}
          ItemSeparatorComponent={() => ListSeperator({horizontal: true})}
          renderItem={({item}) => (
            <Card
              onPress={() => {
                const alreadySelected = filters.find(fil => fil === item);

                if (alreadySelected) {
                  return setFilters(prevFilters => [
                    ...prevFilters.filter(it => it !== item),
                  ]);
                }
                return setFilters(prevFilters => [...prevFilters, item]);
              }}
              selected={!!filters.find(fil => fil === item)}
              style={styles.cardContainer}>
              <Text style={styles.text}>{item}</Text>
            </Card>
          )}
        />
      </View>
      <View style={styles.h10} />
      <FlatList
        contentContainerStyle={styles.topItemsContainer}
        data={usersType === 'users' ? DUMMY_USERS : (DUMMY_EMPLOYEES as any)}
        renderItem={props => {
          if (usersType === 'employees') {
            return <EmployeeListItem {...props} />;
          }

          return <UserListItem {...props} />;
        }}
        ItemSeparatorComponent={ListSeperator}
      />
    </View>
  );
};

export default UsersDashboard;

const styles = StyleSheet.create({
  h10: {height: 10},
  topItemsContainer: {paddingHorizontal: 15},
  text: {
    color: Colors.Black,
    fontSize: 11,
    lineHeight: 11 * 1.3,
    fontWeight: '700',
  },
  cardContainer: {
    paddingVertical: 1,
  },
  addStyle: {
    color: Colors.Black,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 24 * 1.4,
  },
  screen: {flex: 1, backgroundColor: Colors.Background},
  topTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    lineHeight: 24 * 1.2,
    fontWeight: '700',
    color: Colors.Black,
  },
  empUsersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
