import {
  Alert,
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
import TextInput from '../components/ui/text-input';
import {useController, useForm} from 'react-hook-form';
import DropdownInput from '../components/ui/dropdown-input';
import ElevatedCard from '../components/ui/elevated-card';
import uuid from 'react-native-uuid';
import {StackScreenProps} from '@react-navigation/stack';
import {UsersStackNavigationParams} from '../navigation/users-stack-navigation';

type AddUserOrEmployeeForm = {
  name: string;
  type: 'user' | 'emplpoyee';
  plan: '10Amp' | '20Amp' | '5Amp' | '2Amp' | null;
  payment: 'fixed' | 'not_fixed' | null;
  address: string;
  remarks: string;
  generatedId: string;
  date: Date;
  salary: string;
  role: string;
};

const USER_TYPES = ['user', 'employee'];

const PLANS = ['10Amp', '5Amp', '2Amp', '20Amp'];

const PAYMENTS = ['fixed', 'not_fixed'];

const ROLES = ['admin', 'normal'];

type AddEditUserOrEmployeeScreenProps = StackScreenProps<
  UsersStackNavigationParams,
  'AddUserOrEmployee'
>;

const AddEditUserOrEmployeeScreen = ({
  navigation,
  route: {params},
}: AddEditUserOrEmployeeScreenProps) => {
  const {control, watch, handleSubmit} = useForm<AddUserOrEmployeeForm>({
    defaultValues: {
      address: params.employee?.address || params.user?.address,
      date: new Date(),
      generatedId: params.employee?.id
        ? params.employee.id?.toString()
        : params.user?.id
        ? params?.user.id?.toString()
        : '',
      name: params?.employee?.name || params.user?.name || '',
      payment: params.user?.payment_type,
      plan: params.user?.plan,
      remarks: params.employee?.remark || params.user?.remark,
      type: params?.employee ? 'emplpoyee' : 'user',
      salary: params.employee?.salary ? params.employee.salary?.toString() : '',
      role: params.employee?.role ?? '',
    },
  });

  const {field} = useController({
    control,
    name: 'generatedId',
    defaultValue: '',
  });

  const insets = useSafeAreaInsets();

  function onSubmit({
    address,
    date,
    generatedId,
    name,
    payment,
    plan,
    remarks,
    type,
  }: AddUserOrEmployeeForm) {
    //HERE

    console.log(address, date, generatedId, name, payment, remarks, plan, type);

    Alert.alert('Confirm?', 'Do you confirm your info aw shi hek??', [
      {text: 'Cancel'},
      {text: 'Save', onPress: () => navigation.goBack()},
    ]);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {paddingTop: insets.top + 15},
      ]}>
      <View style={styles.topItemsContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={{uri: ImageStrings.TrashIcon, height: 21, width: 21}}
          />
        </Pressable>
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Image source={{uri: ImageStrings.SaveIcon, height: 21, width: 21}} />
        </Pressable>
      </View>
      <View style={styles.flexRow}>
        <DropdownInput
          control={control}
          name="type"
          items={USER_TYPES}
          defaultValue={'user'}
        />
      </View>
      <Text style={styles.dateText}>Date (auto filled)</Text>
      <View style={styles.fullNameTextInputContainer}>
        <Image
          source={{uri: ImageStrings.ProfileIcon, height: 31, width: 31}}
          borderRadius={100}
        />
        <TextInput
          control={control}
          name="name"
          defaultValue={''}
          backgroundColor={Colors.Blue}
          textColor={Colors.White}
          placeholder="Full name..."
        />
      </View>
      {watch('type') === 'user' ? (
        <>
          <View style={styles.fullNameTextInputContainer}>
            <Text style={styles.label}>Plan:</Text>
            <DropdownInput
              control={control}
              name="plan"
              placeholder="Plan"
              items={PLANS}
            />
            <DropdownInput
              control={control}
              name="payment"
              placeholder="Payment"
              items={PAYMENTS}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.fullNameTextInputContainer}>
            <Text style={styles.label}>Salary:</Text>
            <TextInput
              textColor={Colors.Black}
              control={control}
              name="salary"
              placeholder="Salary"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={styles.fullNameTextInputContainer}>
            <Text style={styles.label}>Role:</Text>
            <DropdownInput
              control={control}
              name="role"
              placeholder="Role"
              items={ROLES}
            />
          </View>
        </>
      )}
      <View style={styles.fullNameTextInputContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          textColor={Colors.Black}
          control={control}
          name="address"
          placeholder="Address"
        />
      </View>
      <View style={styles.fullNameTextInputContainer}>
        <Text style={styles.label}>Remark:</Text>
        <TextInput
          textColor={Colors.Black}
          control={control}
          name="remarks"
          placeholder="Remarks"
        />
      </View>
      <View style={styles.generateIdContainer}>
        <Text style={styles.idText}>{field.value}</Text>
        <ElevatedCard
          onPress={() => {
            const uid = uuid.v4();

            field.onChange(uid);
          }}
          textStyle={styles.generateIdText}>
          Generate ID
        </ElevatedCard>
      </View>
    </ScrollView>
  );
};

export default AddEditUserOrEmployeeScreen;

const styles = StyleSheet.create({
  idText: {
    color: Colors.Black,
    fontSize: 12,
    lineHeight: 12 * 1.2,
  },
  generateIdContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
  generateIdText: {
    fontSize: 24,
    lineHeight: 24 * 1.2,
    color: Colors.White,
    fontWeight: '700',
  },
  flexRow: {flexDirection: 'row', justifyContent: 'center'},
  label: {
    color: Colors.Black,
    fontSize: 24,
    lineHeight: 24 * 1.3,
    fontWeight: '700',
  },
  fullNameTextInputContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dateText: {color: Colors.Black, fontWeight: '700'},
  topItemsContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screen: {flex: 1, backgroundColor: Colors.Background},
  contentContainerStyle: {paddingHorizontal: 15, gap: 25},
});
