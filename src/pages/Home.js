import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native';

import Services from './Services';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Services navigation={navigation} />
      <TouchableOpacity
        style={styles.crtbtn}
        onPress={() => {
          navigation.navigate('Create');
        }}>
        <Text style={styles.txt}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  crtbtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 13,
    fontWeight: '900',
    color: 'black',
  },
});
