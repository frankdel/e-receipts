
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    FlatList, 
    ActivityIndicator, 
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import RootNavigation from '../navigation/RootNavigation';
import {
  NavigationActions,
} from 'react-navigation';

var qrCodeUrl = 'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/GetUserQRCodeLink';

export default class QRScreen extends Component<{}> {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

	static navigationOptions = {
    title: 'QR Code',
  };
  state = {
    text: 'E-Receipts',
    isLoading: true
  };

  render() {
    if(this.state.isLoading){
      fetch(qrCodeUrl, {
        method: 'Post',
        body: JSON.stringify({
          body:{
            userName:global.userName,
          }
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          isLoading: false,
          text: responseJson,
        }, function(){
          console.log(responseJson);
          var body = responseJson
          if(body.errorMessage != null) { 
            console.log("Received the following response: " + responseJson.errorMessage)          
          }
          else {
            console.log("Received the following response: " + responseJson)
            this.state.text = responseJson
          }
        });
      })
      .catch((error) =>{
        console.error("Failed to reach out and get QR code link for user: " + error);
      });
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
       return (
        <View style={styles.container}>
          <QRCode
            value={this.state.text}
            size={250}
            bgColor='black'
            fgColor='white'/>
        </View>
      );
    }


  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 30,
        borderRadius: 5,
        padding: 5,
    }
});

AppRegistry.registerComponent('QRScreen', () => App);
