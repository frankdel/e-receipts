import React from 'react';
import {ScrollView,
		StyleSheet,
		Text,
		View,
		Image,
		AppRegistry,
		ActivityIndicator,
		TouchableHighlight,
	RefreshControl} from 'react-native';
		import {
		  NavigationActions,
		} from 'react-navigation';

var badUrl = 'https://facebook.github.io/react/logo-og.png';
var dir = [];
var count = 0;
var totalSize = -1;

export default class ReceiptsScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipts List',
  };

	constructor(props) {
    super(props);
    this.state = {
			loadingNames: true,
      isLoading: true,
			refreshing: false,
    };
  }

	getNames() {
		console.log("global username: "+global.userName);
		var globalUserName = global.userName;
    var url =
      'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/GetAllRecipt';
    return fetch(url, {
      method: 'Post',
      body: JSON.stringify({
        body: {
          userName: globalUserName,
        },
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            loadingNames: false,
            dataSource: JSON.stringify(
              JSON.parse(responseJson.body).message.recordset[1].receiptName
            ),
          },
          function() {
            var myObject = JSON.parse(responseJson.body).message.recordset;
            var size = Object.keys(myObject).length;
						totalSize = size;
            for (var i = 0; i < size; i++) {
              var getName = JSON.stringify(
                JSON.parse(responseJson.body).message.recordset[i].receiptName
              );
              this.getReceiptImg(getName);
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

	getReceiptImg(nameIn) {
    var url =
      'https://6cl2u8dzoi.execute-api.us-east-2.amazonaws.com/StageOne/getreceipt';
    nameIn = nameIn.replace(/["]+/g, '');
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
            dataSource: JSON.stringify(JSON.parse(responseJson.body).message),
          },
          function() {
            var url = JSON.stringify(JSON.parse(responseJson.body).message);
            url = url.replace(/['"]+/g, '');
            if (url == 'null') {
              dir.push({
								key: nameIn,
								value: badUrl,
							});
            } else {
							dir.push({
								key: nameIn,
								value: url,
							});
            }
						count++;
						if(count == totalSize){
							this.setState({
								isLoading: false,
							});
						}
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
	_onRefresh() {
    this.setState({refreshing: true});
		dir = [];
		this.setState(
			{
				loadingNames: true,
				isLoading: true,
				refreshing: false,
			}
		);
  }
  render() {
		const { navigate } = this.props.navigation;

		if (this.state.loadingNames) {
      this.getNames();
      return (
        <View style={{ flex: 1, padding: 20, paddingTop: 375 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
	 <ScrollView style={styles.container}
	 refreshControl={
	<RefreshControl
		refreshing={this.state.refreshing}
		onRefresh={this._onRefresh.bind(this)}
	/>
}>
      <View style={styles.row}>
			<Text style={{fontSize:28,textAlign: 'center',}}>Receipts List</Text></View>
			{dir.map((value, key) =>
			<View style={styles.row} key={key}>
			<Text key={key+1}>Receipt {value.key}</Text>
	        <TouchableHighlight
					key={key+2}
					onPress=
						{() => navigate('ReceiptImgScreen',
						{receiptName: value.key})}>
	        <Image
							key={key+3}
	            source={{ uri: value.value }}
	            style={styles.imageStyle}
	          />
	        </TouchableHighlight>
			</View>)}
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
