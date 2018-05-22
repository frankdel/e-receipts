import React from 'react';
import {ScrollView,
		StyleSheet,
		Text,
		View,
		Image,
		AppRegistry,
		ActivityIndicator,
		TouchableHighlight,
		Button,
		StackNavigator,
		ReceiptsScreen,
		Alert} from 'react-native';
import {
		  NavigationActions,
		} from 'react-navigation';

var badUrl = 'https://facebook.github.io/react/logo-og.png';

export default class SingleReceiptScreen extends React.Component {

  static navigationOptions = {
    title: 'Receipt',
  };

	constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
	//
	Delete(name)
	{
		const { navigate } = this.props.navigation;
		//navigate('ReceiptsScreen');
		//Alert.alert(name);
		var url = 'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/deletereceipt';
     fetch(url, {
        method: 'Post',
        body: JSON.stringify({
           body:{
                   receiptName:name,
                }

	       })
      })
			.then((response) => {
								return response.json();
						})
			.then((json) => {
								console.log('receipt had been deleted')
								//this.setState({ accessToken: json.done.json.access_token });
						})
		navigate('Main')
   //navigate('ReceiptsScreen');
}

	getReceiptImg(nameIn) {
    nameIn = nameIn.replace(/["]+/g, '');
    console.log('Receipt nameIn: '+nameIn);
    var url =
      'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/getreceipt';

    return fetch(url, {
      method: 'Post',
      body: JSON.stringify({
        body: {
          receiptName: nameIn,
        },
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: JSON.stringify(JSON.parse(responseJson.body).message),
          },
          function() {
            var url = JSON.stringify(JSON.parse(responseJson.body).message);
						url = url.replace(/['"]+/g, '');
						//console.log('In Function URL:' + url);
            if (url == 'null') {
              this.setState({
                imgUrl: badUrl,
              });
            } else {
              this.setState({
                imgUrl: url,
              });
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
		const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const rName = params ? params.receiptName : null;

		if (this.state.isLoading) {
      this.getReceiptImg(rName);
      return (
        <View style={{ flex: 1, padding: 20, paddingTop: 375 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
	 <ScrollView style={styles.container}>
	  <View style={styles.row}>
		<Text>Receipt {rName}</Text>
		<Button
		onPress={() => Alert.alert(
			'Delete Receipt',
			'Comfirm to delete this receipt?',
			[
				{text: 'Yes', onPress: () => this.Delete(rName)},
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			],
	{ cancelable: false }
)}
  	title="Delete"
  	accessibilityLabel="Delete this receipt."
/>
        <Image
            source={{ uri: this.state.imgUrl }}
            style={styles.imageStyle}
          />
		</View>
	  </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  row:{
	padding: 15,
    marginBottom: 5,
	backgroundColor: 'white',
  },
  imageStyle:{
	  width:350,
		height:1000,
	  resizeMode: 'contain',
  },
});
AppRegistry.registerComponent('ReceiptsPage', () => App);
