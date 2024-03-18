import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ScreenHeaderProps = {
  children?: string | React.ReactNode;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

const ScreenHeader = ({children}: ScreenHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top + 15}]}>
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
    borderStyle: 'dashed',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.Black,
    fontWeight: '700',
  },
});
