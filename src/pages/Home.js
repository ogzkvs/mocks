import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import Services from './Services';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.btn}>
        <Button mode="text" onPress={() => navigation.navigate(Services)}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
