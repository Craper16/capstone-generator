import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/colors';
import Card from '../components/ui/card';
import ListSeperator from '../components/ui/list-seperator';
import ListTextHeader from '../components/ui/list-text-header';

const AnalyticsScreen = () => {
  return (
    <FlatList
      style={styles.screen}
      data={[1, 2, 3]}
      ItemSeparatorComponent={ListSeperator}
      contentContainerStyle={[styles.containerStyle]}
      ListHeaderComponent={() => ListTextHeader({children: 'Analytics'})}
      renderItem={() => (
        <Card>
          <View style={styles.dummyView} />
        </Card>
      )}
    />
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: Colors.Background},
  dummyView: {height: 200},
  containerStyle: {paddingHorizontal: 15, paddingBottom: 40},
});
