import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const Details = ({route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.viewImage}>
          <Image style={styles.itemImage} source={{uri: route.params.avatar}} />
        </View>
      </View>
      <View style={styles.txtView}>
        <View style={styles.txtStyle}>
          <View style={styles.nameView}>
            <Text style={styles.name}>{route.params.name}</Text>
            <Text style={styles.name}>${route.params.price}</Text>
          </View>
          <View style={{marginTop: 12}}>
            <Text style={styles.name}>{route.params.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    width: 350,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 45,
    paddingVertical: 16,
  },

  viewImage: {
    padding: 1,
  },
  itemImage: {
    width: 180,
    height: 180,
  },

  txtView: {
    backgroundColor: 'black',
    width: 350,
    height: 370,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  txtStyle: {margin: 3},
  name: {
    color: 'white',
    fontSize: 15,
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
