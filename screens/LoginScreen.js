
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Label,
  Button,
  Alert,
  AppRegistry,
  KeyboardAvoidingView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import RootNavigation from '../navigation/RootNavigation';
import {
  NavigationActions,
} from 'react-navigation';

export default class LoginScreen extends React.Component {
static navigationOptions = {
    title: 'Welcome to E-Receipts',
  }
  constructor(props) {
      super(props);
       this.state = {
         isLoading:true,
         username:'',
         password:'',
      }
    }

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
  onPressSignin(){
    console.log(this.state.username);
    console.log(this.state.password);
    var username=this.state.username;
    var password=this.state.password;
    if(username.length < 1 || password.length<1)
    {
      Alert.alert("Username or Password empty");
    }else {
        var url = 'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/getuser';
        fetch(url, {
     method: 'Post',
     body: JSON.stringify({
       body:{
       userName:username,
       password:password,
       }
     }),
   })
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: JSON.stringify(responseJson),
       }, function(){
         console.log(responseJson);
         var body = JSON.parse(responseJson.body)
         if(body.message.recordsets[0] == '')
         {
           Alert.alert("Login failed. Please try again.");
         }
         else {
           Alert.alert("","Login successful!",
  [
    {text: 'OK', onPress: () => this.props.navigation.navigate('Main')},
  ],
  { cancelable: false }
)
         }
       });
     })
     .catch((error) =>{
       console.error("FAILEd========="+error);
     });
      }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
     behavior="padding"
     style={styles.container}
   >
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      <View><Text style={styles.TitleText}>E-Receipts</Text></View>
      <View>
    <TextInput
        style={styles.textInput}
        placeholder='Username'
        onChangeText={username => this.setState({username})}
    /></View>
    <View>
    <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        placeholder='Password'
        onChangeText={password => this.setState({password})}
    /></View>
    <View style={styles.buttonContainer}>
    <Button style={styles.buttonContainer}
  onPress={this.onPressSignin.bind(this)}
  title="Sign In"
  accessibilityLabel="Sign In button"
/>
</View>
<View style={styles.signupbtn}>
    <Button
    title="Don't have account? Sign Up Here"
    onPress={() => this.props.navigation.navigate('SignupScreen')}
    accessibilityLabel="Sign up button"
    />
    </View>
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C62828',
  },
  scroll: {
    backgroundColor: '#C62828',
    padding: 10,
    paddingTop:30,
    flexDirection: 'column'
},
TitleText:{
  fontSize:20,
  paddingTop:20,
  color:'#FFFFFF',
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight:'bold'
},
 buttonContainer: {
  margin: 20,
  borderRadius: 4,
  backgroundColor: '#29B6F6',
  },
  signupbtn:{
    margin: 20,
    borderRadius: 4,
  },
  label: {
    color: '#F5F5F5',
    fontSize: 20
},
alignRight: {
    alignSelf: 'flex-end'
},
textInput: {
  height: 34,
  margin: 20,
  marginBottom: 0,
  fontSize: 16,
  paddingHorizontal: 10,
  borderRadius: 4,
  borderColor: '#ccc',
  borderWidth: 1,
  backgroundColor: '#FFF'
},
});
AppRegistry.registerComponent('LoginPage', () => App);
