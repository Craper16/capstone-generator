import {Alert, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/colors';
import ScreenHeader from '../components/ui/screen-header';
import TextInput from '../components/ui/text-input';
import {useController, useForm} from 'react-hook-form';
import Card from '../components/ui/card';
import ElevatedCard from '../components/ui/elevated-card';
import DocPicer, {DocumentPickerResponse} from 'react-native-document-picker';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackNavigatorParams} from '../navigation/home-stack-navigation';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../utils/date-utils';

type AddAnnouncementsForm = {
  title: string;
  description: string;
  attachments: DocumentPickerResponse[];
  date: Date | null;
};

type AddAnnouncementsProps = StackScreenProps<
  HomeStackNavigatorParams,
  'AddAnnouncements'
>;

const AddAnnouncements = ({navigation}: AddAnnouncementsProps) => {
  const {control, handleSubmit} = useForm<AddAnnouncementsForm>({
    defaultValues: {
      attachments: [],
      date: null,
      description: '',
      title: '',
    },
  });

  const [open, setOpen] = useState(false);

  const {field} = useController({
    control,
    name: 'attachments',
    defaultValue: [],
  });

  const {field: dateField} = useController({
    control,
    name: 'date',
    defaultValue: null,
  });

  function onSubmit({
    attachments,
    date,
    description,
    title,
  }: AddAnnouncementsForm) {
    // SUBMIT HERE

    console.log(attachments, date, description, title);

    Alert.alert('Confirm?', 'Do you confirm your info aw shi hek??', [
      {text: 'Cancel'},
      {text: 'Save', onPress: () => navigation.goBack()},
    ]);
  }

  return (
    <View style={styles.screen} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader>New Announcement</ScreenHeader>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          control={control}
          name="title"
          placeholder="Title"
          textColor={Colors.Black}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          control={control}
          name="description"
          placeholder="Description"
          textColor={Colors.Black}
          style={styles.w100}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Attachments:</Text>
        <Card
          onPress={async () => {
            try {
              const res = await DocPicer.pick({allowMultiSelection: true});

              field.onChange(res);
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.addFromDeviceText}>Add From Device</Text>
          {field.value.map(fi => (
            <Text key={fi.uri} style={styles.addFromDeviceText}>
              {fi.name}
            </Text>
          ))}
        </Card>
      </View>
      <View style={styles.bottomButtonContainer}>
        <ElevatedCard
          textStyle={styles.bottomButtonsTextStyle}
          onPress={() => setOpen(true)}>
          Schedule
        </ElevatedCard>
        <DatePicker
          date={dateField.value || new Date()}
          modal
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={date => {
            dateField.onChange(date);
            setOpen(false);
          }}
        />
        <ElevatedCard
          textStyle={styles.bottomButtonsTextStyle}
          onPress={handleSubmit(onSubmit)}>
          Post
        </ElevatedCard>
      </View>
      {dateField.value && (
        <Text style={[styles.label, styles.textAlCenter]}>
          {'Scheduled for: ' + formatDate(dateField.value)}
        </Text>
      )}
    </View>
  );
};

export default AddAnnouncements;

const styles = StyleSheet.create({
  textAlCenter: {textAlign: 'center'},
  bottomButtonsTextStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.White,
  },
  bottomButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  addFromDeviceText: {color: Colors.Gray, fontWeight: '700'},
  descriptionContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  w100: {width: '100%'},
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 15,
    gap: 20,
  },
  label: {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: Colors.Black,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});
