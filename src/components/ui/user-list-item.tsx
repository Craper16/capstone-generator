import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Card from './card';
import {User} from '../../screens/users-dashboard';
import {Colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {UsersStackNavigationParams} from '../../navigation/users-stack-navigation';

type UserListItemProps = {
  item: User;
  index: number;
};

const UserListItem = ({item}: UserListItemProps) => {
  const navigation =
    useNavigation<
      StackNavigationProp<UsersStackNavigationParams, 'UsersDashboard'>
    >();

  const isPending = item.amount_to_pay > item.paid;

  return (
    <Card
      style={styles.cardContainer}
      onPress={() => navigation.navigate('UserDetails', {user: item})}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.detailText}>
        {isPending ? 'Payment Pending' : 'Paid'}
      </Text>
    </Card>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.Black,
    fontSize: 24,
    lineHeight: 24 * 1.3,
    fontWeight: '700',
  },
  detailText: {
    color: Colors.Black,
    fontSize: 15,
    lineHeight: 15 * 1.3,
    fontWeight: '700',
  },
});
