import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const axios = require('axios')
const { width, height } = Dimensions.get('window')

export default class KeyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleKeyPress() {
    var course = this.props.course;
    Actions.PreUploadStudentTest(course);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.courseButton}
          onPress={this.handleKeyPress.bind(this)}
          accessibilityLabel={this.props.course.keyName}>
          <Text style={styles.courseTextTop}>{this.props.course.keyName}</Text>
          <Text style={styles.courseTextBottom}>Key ID: {this.props.course.keyId}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'
// '#C9D492'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 20,
    height: height / 4,
    backgroundColor: '#ADC986',
  },
  courseButton: {
    paddingTop: height / 20,
    flex: 1,
    backgroundColor: '#85AF4B',
    borderRadius: 4,
    width: width * .8,
    left: width / 10
  },
  courseTextTop: {
    fontSize: 24,
    paddingTop: height / 100,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  courseTextBottom: {
    fontSize: 18,
    paddingTop: 0,
    textAlign: 'center',
    color: '#C9D492'
  }
});