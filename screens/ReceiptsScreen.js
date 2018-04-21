import React from 'react';
import {ScrollView,
		StyleSheet,
		Text,
		View,
		Image,
		AppRegistry,
		ActivityIndicator,
		TouchableHighlight} from 'react-native';
		import {
		  NavigationActions,
		} from 'react-navigation';

var badUrl = 'https://facebook.github.io/react/logo-og.png';

export default class ReceiptsScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipts List',
  };

	constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
			receiptName: 'test1',
    };
  }

	getReceiptImg() {
    var url =
      'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/getreceipt';
    return fetch(url, {
      method: 'Post',
      body: JSON.stringify({
        body: {
          receiptName: 'test1',
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
		var rName = JSON.stringify(this.state.receiptName);

		if (this.state.isLoading) {
			this.getReceiptImg();
      return (
        <View style={{ flex: 1, padding: 20, paddingTop: 375 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
	 <ScrollView style={styles.container}>
      <View style={styles.row}><Text style={{fontSize:28,textAlign: 'center',}}>Receipts List</Text></View>
	  <View style={styles.row}>
		<Text>Receipt {rName}</Text>
        <TouchableHighlight onPress={() => navigate('ReceiptImgScreen',{receiptName: rName})}>
        <Image
            source={{ uri: this.state.imgUrl }}
            style={styles.imageStyle}
          />
        </TouchableHighlight>
		</View>
		<View style={styles.row}>
		<Text>Receipt {rName}</Text>
        <TouchableHighlight onPress={() => navigate('ReceiptImgScreen',{receiptName: rName})}>
        <Image
            source={{ uri: this.state.imgUrl }}
            style={styles.imageStyle}
          />
        </TouchableHighlight>
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
	  width:100,
		height:200,
	  resizeMode: 'contain',
  },
});
AppRegistry.registerComponent('ReceiptsPage', () => App);
