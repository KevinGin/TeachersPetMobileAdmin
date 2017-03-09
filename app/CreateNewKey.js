import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const axios = require('axios')
const { width, height } = Dimensions.get('window')


export default class CreateNewKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyName: '',
    };
  }

  handleSubmit() {
    var user = this.props.user;
    var course = this.props.course;
    var keyName = this.state.keyName;
    var isKey = true;

    var data = {
      user:user,
      course:course,
      keyName:keyName,
      isKey:isKey
    }

    Actions.CameraView(data);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={[styles.input, styles.inputTop]}
          placeholder="Test Name"
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({keyName: text})}
          accessibilityLabel="Input Username"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSubmit.bind(this)}
          accessibilityLabel="Create Account">
          <Text style={styles.loginText}>Upload Key</Text>
        </TouchableOpacity>
        <View style={styles.space}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ADC986',
  },
  input: {
    flex: 1,
    left: width / 10,
    width: width * .8,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 15

  },
  inputTop: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,   
  },
  inputBottom: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  mediumLine: {
    height: 5
  },
  space: {
    flex: 3
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#85AF4B',
    borderRadius: 4,
    width: width * .8,
    left: width / 10
  },
  loginText: {
    fontSize: 20,
    paddingTop: height / 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});