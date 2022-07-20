import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {get} from '../service';
const {width, height} = Dimensions.get('window');

const SelectCategory = ({setStatusFilter, status}) => {
  const [categories, setCategories] = useState([
    {
      id: -1,
      name: 'All',
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = () => {
    get('/categories').then(result => {
      setCategories([...categories, ...result]);
    });
  };

  const renderCategories = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.listTabs}>
          <TouchableOpacity
            style={[styles.btnTab, status === item.name && styles.btnTabActive]}
            onPress={() => {
              setStatusFilter(item.name);
            }}>
            <Text
              style={[
                styles.textTab,
                status === item.name && styles.textTabActive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={categories}
          renderItem={renderCategories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
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
  },
  listTabs: {
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 16,
  },
  btnTab: {
    width: width / 3.5,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  btnTabActive: {
    backgroundColor: '#0064E5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F6F6F6',
  },
  textTabActive: {
    color: '#FFFFFF',
    fontFamily: 'Product Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    size: 14,
  },
  textTab: {
    color: '#363A3D',
    fontFamily: 'Product Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    size: 14,
  },
});
