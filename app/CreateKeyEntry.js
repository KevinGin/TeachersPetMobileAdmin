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

export default class CreateKeyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  sample() {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.createCourseButton}
          accessibilityLabel="Create New Test">
          <Text style={styles.courseText}>Create New Test</Text>
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
  createCourseButton: {
    paddingTop: height / 20,
    flex: 1,
    backgroundColor: '#D3E2BD',
    borderRadius: 4,
    width: width * .8,
    left: width / 10
  },
  courseText: {
    fontSize: 20,
    paddingTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'yellow'
  }
});