import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {get} from '../service';
import SelectCategory from '../components/SelectCategory';

const {width, height} = Dimensions.get('window');

const Services = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [datalist, setDatalist] = useState();
  const [status, setStatus] = useState('All');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    get('/products').then(result => {
      setServices([...result]);
    });
  };
  const setStatusFilter = status => {
    if (status !== 'All') {
      setDatalist([...services.filter(e => e.category === status)]);
    } else {
      setDatalist(services);
    }
    setStatus(status);
  };

  const renderServices = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', item);
            }}>
            <View style={styles.viewImage}>
              <Image style={styles.itemImage} source={{uri: item.avatar}} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.txtView}>
          <View style={styles.txtStyle}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>${item.price}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
        <View style={{flexDirection: 'row'}}>
          <SelectCategory setStatusFilter={setStatusFilter} status={status} />
        </View>
        <ScrollView horizontal={true}>
          <FlatList
            data={status === 'All' ? services : datalist}
            renderItem={renderServices}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    width: 300,
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  txtView: {
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 300,
    height: 70,
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
  txtStyle: {margin: 5},
  name: {
    color: 'white',
    fontSize: 15,
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
  allcontainer: {
    justifyContent: 'center',
  },
});
