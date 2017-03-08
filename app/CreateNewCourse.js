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


export default class CreateNewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
    };
  }

  handleSubmit() {
    var context = this;
   
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {
      var data = {
        TeacherId: context.props.user.id,
        ClassName: context.state.courseName,
        token: token
      }

     var config = {
        method: 'post',
        data: data,
        url: 'http://10.7.24.223:8080/api/addClass'
      }

      axios(config)
        .then((response) => {
          console.log('posted successfully --------------------⁄')
          Actions.Courses({user:context.props.user})

        })
        .catch((err) => {
          console.log('catch called -------------------------')
          // this.setState({
          //   spinner: false,
          // })

          // Actions.FailedToPost(data);
        }) 
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={[styles.input, styles.inputTop]}
          placeholder="Course Name"
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({courseName: text})}
          accessibilityLabel="Input Username"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSubmit.bind(this)}
          accessibilityLabel="Create Account">
          <Text style={styles.loginText}>Create Course</Text>
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