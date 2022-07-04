import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Services from './pages/Services';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <View style={styles.container}>
      <View style={styles.txtView}>
        <Text style={styles.txt}>Services</Text>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity>
          <Ionicons name="options" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerTitleAlign: 'center', title: 'Home'}}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  txt: {
    fontSize: 20,
    color: '#363A3D',
    fontWeight: '400',
    fontFamily: 'Product Sans',
  },
  container: {
    flexDirection: 'row',
  },
  txtView: {width: '70%', alignItems: 'center'},
  optionView: {width: '24%', alignItems: 'center'},
});
