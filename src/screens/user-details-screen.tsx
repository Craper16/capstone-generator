import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageStrings} from '../assets/image-strings';
import {StackScreenProps} from '@react-navigation/stack';
import {UsersStackNavigationParams} from '../navigation/users-stack-navigation';
import {formatDate} from '../utils/date-utils';
import ElevatedCard from '../components/ui/elevated-card';
import Card from '../components/ui/card';

type UserDetailsScreenProps = StackScreenProps<
  UsersStackNavigationParams,
  'UserDetails'
>;

type Payment = {
  id: number;
  date: Date;
  status: 'to_be_paid' | 'paid' | 'pending';
  total: number;
};

export const DUMMY_PAYMENTS: Payment[] = [
  {
    id: 1,
    date: new Date('2024-01-24'),
    status: 'to_be_paid',
    total: 200,
  },
  {
    id: 2,
    date: new Date('2024-01-24'),
    status: 'pending',
    total: 100,
  },
  {
    id: 3,
    date: new Date('2024-01-24'),
    status: 'paid',
    total: 100,
  },
  {
    id: 4,
    date: new Date('2024-01-24'),
    status: 'paid',
    total: 100,
  },
  {
    id: 5,
    date: new Date('2024-01-24'),
    status: 'paid',
    total: 100,
  },
];

const UserDetailsScreen = ({
  navigation,
  route: {params},
}: UserDetailsScreenProps) => {
  const {user} = params;

  const insets = useSafeAreaInsets();

  console.log(user, 'USER');

  return (
    <View
      style={[styles.screen, styles.containerStyle, {paddingTop: insets.top}]}>
      <View style={styles.topItemsContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate('BillingAfterChoosingUser', {
              user: user,
            })
          }>
          <Image source={{uri: ImageStrings.EditIcon, height: 43, width: 43}} />
        </Pressable>
        <Image source={{uri: ImageStrings.TrashIcon, height: 21, width: 21}} />
      </View>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.containerStyle, styles.gap15]}>
        <View style={styles.topTextContainer}>
          <Text style={styles.nameText}>
            {user.name} <Text style={styles.idText}>#{user.id}</Text>
          </Text>
          <Text style={styles.dateJoinedText}>
            Date Joined - {formatDate(user.date_joined)}
          </Text>
        </View>
        <View style={styles.accountsUserNameContainer}>
          <Text style={styles.text}>Accounts under the name</Text>
          <ElevatedCard>Test</ElevatedCard>
        </View>
        <View style={styles.usernamesContainer}>
          <View />
          <View />
          <View />
          <View>
            <Text style={styles.text}>username</Text>
            <Text style={styles.text}>username</Text>
          </View>
          <View />
          <View>
            <Text style={styles.text}>username</Text>
            <Text style={styles.text}>username</Text>
          </View>
          <ElevatedCard>Bill</ElevatedCard>
        </View>
        <Card>
          <Text style={styles.text}>Address:</Text>
          <Text style={styles.text}>{user.address}</Text>
        </Card>
        <Card>
          <Text style={styles.text}>Payments</Text>
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, idx) => idx.toString()}
            data={DUMMY_PAYMENTS}
            contentContainerStyle={styles.paymentContainerStyle}
            renderItem={({item}) => (
              <View style={styles.paymentContainerStyle}>
                <Text key={item.id}>{item.id}</Text>
              </View>
            )}
          />
        </Card>

        <Card>
          <Text style={styles.text}>Remark:</Text>
          <Text style={styles.text}>{user.remark}</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  paymentContainerStyle: {width: '100%'},
  usernamesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 13,
    borderStyle: 'dotted',
  },
  text: {color: Colors.Black, fontWeight: '700'},
  accountsUserNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screen: {flex: 1, backgroundColor: Colors.Background},
  containerStyle: {paddingHorizontal: 15},
  gap15: {gap: 15},
  topItemsContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontWeight: '700',
    fontSize: 24,
    color: Colors.Black,
    lineHeight: 24 * 1.3,
  },
  idText: {fontSize: 14},
  dateJoinedText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.Black,
    lineHeight: 14 * 1.3,
  },
});
