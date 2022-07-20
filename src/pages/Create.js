import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {get, postProduct} from '../service';
const {width, height} = Dimensions.get('window');

const Create = () => {
  const [create, setCreate] = useState('');
  const [categories, setCategories] = useState([]);

  const product = React.useRef({
    name: '',
    price: '',
    description: ' ',
    avatar: '',
    category: '',
    developerEmail: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    get('/categories').then(result => {
      setCategories([...result]);
    });
  };

  const createStatus = create => {
    if (create !== 'All') {
      setCreate(create);
    } else {
      setCreate('All');
    }
  };

  const handleSend = () => {
    if (
      product.current.name === '' ||
      product.current.price === '' ||
      product.current.description === '' ||
      product.current.avatar === '' ||
      product.current.category === '' ||
      product.current.developerEmail === ''
    ) {
      Alert.alert('Information', 'Fill in the information', [{text: 'Ok'}]);
    } else {
      postProduct('/products', product.current).then(data => {
        //   console.log(data);
        Alert.alert('Information', 'Your information has been sent', [
          {text: 'Ok'},
        ]);
      });
    }
  };

  const renderCreate = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.listTabs}>
          <TouchableOpacity
            style={[styles.btnTab, create === item.name && styles.btnTabActive]}
            onPress={() => {
              createStatus(item.name);
              product.current.category = item.name;
            }}>
            <Text
              style={[
                styles.textTab,
                create === item.name && styles.textTabActive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={{flex: 1}} bounces={false}>
        <View style={styles.mainContainer}>
          <View style={styles.txtcontainer}>
            <View style={styles.txtInput}>
              <TextInput
                mode="outlined"
                label="Product title"
                onChangeText={text => (product.current.name = text)}
              />
            </View>
            <View style={styles.txtInput}>
              <TextInput
                mode="outlined"
                label="Price"
                onChangeText={text => (product.current.price = text)}
              />
            </View>
            <View style={styles.txtInput}>
              <TextInput
                label="Description"
                multiline
                mode="outlined"
                onChangeText={text => (product.current.description = text)}
              />
            </View>
            <View style={styles.txtInput}>
              <TextInput
                mode="outlined"
                label="DeveloperEmail"
                onChangeText={text => (product.current.developerEmail = text)}
              />
            </View>
            <View style={styles.txtInput}>
              <TextInput
                mode="outlined"
                label="Image Link"
                onChangeText={text => (product.current.avatar = text)}
              />
            </View>
          </View>
          <View style={styles.txtView}>
            <Text style={styles.txt}>
              Selected Category: {product.current.category}
            </Text>
          </View>
          <View>
            <FlatList
              data={categories}
              renderItem={renderCreate}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
          <Button
            mode="outlined"
            onPress={() => {
              handleSend();
            }}>
            Add Product
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Create;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eceff1',
    paddingHorizontal: 16,
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
  listTabs: {
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 16,
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
  txtInput: {
    marginTop: 26,
  },

  container: {
    justifyContent: 'center',
  },

  txtcontainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  txtView: {
    marginTop: 16,
  },
  txt: {
    fontSize: 16,
    fontWeight: '900',
  },
});
