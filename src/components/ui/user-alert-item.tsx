import {
  Alert as RNAlert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Alert} from '../../screens/user-alert-system';
import {Colors} from '../../utils/colors';
import {formatDate} from '../../utils/date-utils';
import TextInput from './text-input';
import {useForm} from 'react-hook-form';
import {ImageStrings} from '../../assets/image-strings';

type UserAlertItemProps = {
  item: Alert;
  index: number;
};

type ReplyToAlertForm = {
  reply: string;
};

const UserAlertItem = ({item}: UserAlertItemProps) => {
  const {control, handleSubmit, reset} = useForm<ReplyToAlertForm>({
    defaultValues: {reply: ''},
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const titleContainerBottomWidth = {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
    paddingBottom: 15,
  };

  function onSubmit({reply}: ReplyToAlertForm) {
    // SUBMIT HERE

    console.log(reply);

    RNAlert.alert('Confirm?', 'Do you confirm your info aw shi hek??', [
      {text: 'Cancel'},
      {
        text: 'Save',
        onPress: () => {
          setIsExpanded(false);
          reset();
        },
      },
    ]);
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
      <View
        style={[
          styles.titleContainer,
          isExpanded && titleContainerBottomWidth,
        ]}>
        <Text
          style={[
            styles.exclamationMark,
            {color: item.urgent ? Colors.Red : Colors.Black},
          ]}>
          !
        </Text>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{formatDate(item.date)}</Text>
      </View>
      {isExpanded && (
        <>
          <View style={styles.itemsContainer}>
            <View style={styles.userOwnerContainer}>
              <Text style={[styles.text, styles.ownerUserText]}>
                {item.user.name}
              </Text>
              <Text style={[styles.text, styles.descriptionText]}>
                {item.user_description}
              </Text>
            </View>
            <View style={styles.userOwnerContainer}>
              <Text style={[styles.text, styles.ownerUserText]}>
                {item.user.name}
              </Text>
              <Text style={[styles.text, styles.descriptionText]}>
                {item.user_description}
              </Text>
            </View>
          </View>
          <View>
            <TextInput
              control={control}
              name="reply"
              backgroundColor={Colors.White}
              textColor={Colors.Black}
              placeholder="Reply..."
              multiline
            />
            <Pressable style={styles.selfEnd} onPress={handleSubmit(onSubmit)}>
              <Image
                source={{uri: ImageStrings.BlueCheckBox, height: 32, width: 32}}
              />
            </Pressable>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default UserAlertItem;

const styles = StyleSheet.create({
  descriptionText: {top: 20},
  itemsContainer: {
    gap: 42,
  },
  ownerUserText: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
    borderStyle: 'dashed',
  },
  userOwnerContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  selfEnd: {alignSelf: 'flex-end'},
  container: {
    backgroundColor: Colors.Gray,
    borderRadius: 25,
    padding: 15,
    gap: 32,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  text: {
    color: Colors.Black,
    fontWeight: '700',
    fontSize: 16,
  },
  exclamationMark: {
    position: 'absolute',
    zIndex: 25,
    color: Colors.Black,
    fontSize: 50,
    fontWeight: '700',
    left: 0,
    top: -25,
  },
});
