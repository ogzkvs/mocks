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
} from 'react-native';
import {get} from '../service';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('All');
  const [datalist, setDatalist] = useState(services);

  const setStatusFilter = status => {
    if (status !== 'All') {
      setDatalist([...services.filter(e => e.category === status)]);
    } else {
      setDatalist(services);
    }
    setStatus(status);
  };
  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = () => {
    get('/categories').then(result => {
      setCategories([...result.categories]);
    });
  };
  const fetchServices = () => {
    get('/services').then(result => {
      setServices([...result.services]);
    });
  };

  const renderCategories = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.listTabs}>
          <TouchableOpacity
            style={[styles.btnTab, status === item.key && styles.btnTabActive]}
            onPress={() => {
              setStatusFilter(item.key);
            }}>
            <Text
              style={[
                styles.textTab,
                status === item.key && styles.textTabActive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  const renderServices = ({item}) => {
    const date = moment
      .utc(item.earliestTimeAvailable)
      .format('YYYY-MM-DD HH:mm:ss');
    const date2 = moment(date).startOf().fromNow();
    return (
      <SafeAreaView style={styles.dataView}>
        <View style={styles.itemContainer}>
          <View style={styles.viewImage}>
            <Image style={styles.itemImage} source={{uri: item.thumbnail}} />
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemType}>{item.type}</Text>
            <View style={styles.timerView}>
              <Ionicons name="timer-outline" size={20} />
              <Text style={styles.itemTimer}>{date2}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.heartView}>
              <Ionicons style={styles.heart} name="heart-outline" size={25} />
            </View>
            <View style={styles.ratingView}>
              <Ionicons style={styles.star} name="star" size={20} />
              <Text style={styles.txtRating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
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

      <FlatList
        data={datalist}
        renderItem={renderServices}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({
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
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DEE3E7',
    borderRadius: 7,

    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  viewImage: {
    padding: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemView: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  itemTitle: {
    fontSize: 18,
    color: '#212224',
    fontWeight: '700',
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  dataView: {
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heartView: {
    alignItems: 'flex-end',
  },
  heart: {
    color: '#A4A8AE',
  },
  txtRating: {
    color: '#0064E5',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Product Sans',
    marginLeft: 5,
  },
  star: {
    color: '#0064E5',
  },
  itemType: {
    color: '#9499A3',
    fontSize: 13,
    fontStyle: 'normal',
    fontFamily: 'Product Sans',
    fontWeight: '400',
  },
  itemTimer: {
    color: '#9499A3',
    fontSize: 13,
    fontStyle: 'normal',
    fontFamily: 'Product Sans',
    fontWeight: '400',
    marginLeft: 4,
  },
  timerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
