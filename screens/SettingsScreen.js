import React from 'react';
import {AppRegistry,ScrollView,Text,StyleSheet,View,Image,TouchableHighlight,Alert} from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import {
  NavigationActions,
} from 'react-navigation';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  //use this function to navigate to the target route which will have all the back functionality disabled
resetNavigation(targetRoute) {
const resetAction = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: targetRoute }),
  ],
});
this.props.navigation.dispatch(resetAction);
}

onPressLogout(){
  Alert.alert(
    'Logout',
    'Are you sure to logout?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this.resetNavigation('LoginScreen')},
    ],
    { cancelable: false }
  )
}

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return  (
	 <ScrollView style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row',backgroundColor: 'white',padding: 15, marginBottom: 5,}}>
		<Image
		  source={require('../assets/images/icon.png')} style={styles.iconImage} />
		  <View><Text>E-Receipts</Text>
		  <Text style={{marginTop:10,color:'gray'}}>Helps you manage your receipts</Text>
		  </View>
		</View>
        <View style={styles.row}><Text>Personal Setting</Text></View>
        <View style={styles.row}><Text>Group Setting</Text></View>
        <View style={styles.row}>
        <TouchableHighlight
         style={styles.logoutbtn}
         onPress={this.onPressLogout.bind(this)}
        ><Text> Logout </Text>
        </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  iconImage: {
    width: 100,
    height: 80,
    marginTop: 3,
    marginLeft: -10,
	resizeMode: 'contain',
  },
  logoutbtn:{
    backgroundColor:"#ffff",
  },
  row: {
    padding: 15,
    marginBottom: 5,
	backgroundColor: 'white',
  },
})
AppRegistry.registerComponent('App', () => App)
