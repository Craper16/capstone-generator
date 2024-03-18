import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import ScreenHeader from '../components/ui/screen-header';
import TextInput from '../components/ui/text-input';
import {useForm} from 'react-hook-form';
import ElevatedCard from '../components/ui/elevated-card';

type SettingsForm = {
  bio: string;
  username: string;
  password: string;
  phoneNum: string;
};

const Settings = () => {
  const {control} = useForm<SettingsForm>({
    defaultValues: {bio: '', password: '', phoneNum: '', username: ''},
  });

  // HANDLE BUTTON PRESSES HOWEVER YOU WANT
  return (
    <View style={styles.screen}>
      <ScreenHeader>Settings</ScreenHeader>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Username</Text>
        <TextInput
          control={control}
          name="username"
          placeholder="Username"
          textColor={Colors.Black}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Password</Text>
        <TextInput
          control={control}
          name="password"
          placeholder="Password"
          textColor={Colors.Black}
        />
      </View>
      <View style={styles.actionButtons}>
        <ElevatedCard textStyle={styles.elevatedButtonText}>
          Sign Out
        </ElevatedCard>
        <ElevatedCard textStyle={styles.elevatedButtonText}>Save</ElevatedCard>
      </View>
      <ScreenHeader>Danger Zone</ScreenHeader>
      <ElevatedCard
        style={styles.dangerZoneStyle}
        innerContainerStyle={styles.dangerZoneElevatedButtonContainer}
        textStyle={styles.elevatedButtonText}>
        Delete Account
      </ElevatedCard>
      <ElevatedCard
        style={styles.dangerZoneStyle}
        innerContainerStyle={styles.dangerZoneElevatedButtonContainer}
        textStyle={styles.elevatedButtonText}>
        Delete all users
      </ElevatedCard>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  dangerZoneStyle: {alignSelf: 'center'},
  dangerZoneElevatedButtonContainer: {
    backgroundColor: Colors.Red,
  },
  elevatedButtonText: {color: Colors.White, fontSize: 24, fontWeight: '700'},
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  label: {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: Colors.Black,
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 15,
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});
