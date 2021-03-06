import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

export default class AuthLoadingScreen extends Component {
  componentDidMount () {
    this.loadApp ();
  }

  loadApp = async () => {
    const userToken = await AsyncStorage.getItem ('id');

    if (userToken) {
      this.props.navigation.navigate ('Home');
    } else {
      this.props.navigation.navigate ('Auth');
    }
  };

  render () {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        animating={true}
        color={Colors.red800}
      />
    );
  }
}
