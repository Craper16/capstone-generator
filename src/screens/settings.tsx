import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import ScreenHeader from '../components/ui/screen-header';
import TextInput from '../components/ui/text-input';
import {useForm} from 'react-hook-form';

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

  return (
    <View style={styles.screen}>
      <ScreenHeader>Settings</ScreenHeader>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          control={control}
          name="bio"
          placeholder="Bio"
          textColor={Colors.Black}
        />
      </View>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Phone num</Text>
        <TextInput
          control={control}
          name="phoneNum"
          placeholder="Phone number"
          textColor={Colors.Black}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
