
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import RootNavigation from '../navigation/RootNavigation';
import {
  NavigationActions,
} from 'react-navigation';
export default class QRScreen extends Component<{}> {
	static navigationOptions = {
    title: 'QR Code',
  };
  state = {
    text: 'E-Receipts',
  };


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={250}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
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
