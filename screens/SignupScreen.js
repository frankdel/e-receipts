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
  KeyboardAvoidingView
} from 'react-native';
import {
} from 'react-navigation';
const util=require('util');

var url = 'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/sqlmethods';

export default class SignupScrenn extends React.Component {
	  static navigationOptions = {
    title: 'Sign Up',
  };
constructor(props) {
    super(props);
     this.state = {
      username:'',
      password:'',
      firstname:'',
      lastname:'',
      email:'',
      phone:'',
      result:'',
    }
  }

_handlePress(){
	console.log(this.state.username);
	console.log(this.state.password);
	console.log(this.state.firstname);
	console.log(this.state.lastname);
	console.log(this.state.email);
	console.log(this.state.phone);
	console.log(this.state.result);
  if(this.state.username.length<1||this.state.password.length<1||this.state.firstname.length<1||this.state.lastname.length<1||this.state.email.length<1||this.state.phone.length<1)
  {
    Alert.alert("One or more fields are empty.\n\r Please enter your information.");
  }else {
    var data = {userName: this.state.username, userPassword: this.state.password, firstName: this.state.firstname, lastName: this.state.lastname, email: this.state.email, phone: this.state.phone};

  	fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json())
  .catch(error => Alert.alert('Error'))
  .then(response => (response.message != null) ? Alert.alert('Success') : Alert.alert("User already exists"));
  }
	}


  render() {
const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView
     style={styles.container}
     behavior="padding"
   >
      <ScrollView style={styles.scroll}>
      <View><Text style={styles.TitleText}>E-Receipts</Text></View>
    <View>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({username:text})}
        />
    </View>
     <View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({password:text})}
        />
    </View>
     <View>
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({firstname:text})}
        />
    </View>
     <View>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({lastname:text})}
        />
    </View>
     <View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email:text})}
        />
    </View>
     <View>
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({phone:text})}
        />
    </View>
    <View style={styles.buttonContainer}>
     <Button
     onPress={() => this._handlePress()}
  	 title="Sign Up"
  	 accessibilityLabel="Sign Up button"
    />
    </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C62828',
    justifyContent: 'space-between',
  },
  scroll: {
    backgroundColor: '#C62828',
    padding: 10,
    flex: 1,
},
TitleText:{
  fontSize:24,
  paddingTop:10,
  color:'#FFFFFF',
  textAlign: 'center',
  fontWeight:'bold'
},
 buttonContainer: {
   margin: 20,
   borderRadius: 4,
   backgroundColor: '#29B6F6',
  },
  label: {
    color: '#424242',
    fontSize: 20
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
