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
import KeyEntry from './KeyEntry';
import CreateKeyEntry from './CreateKeyEntry';
const axios = require('axios')
const { width, height } = Dimensions.get('window')

export default class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: {
        classId: 2,
        className: 'Badminton 101',
        answerKeys: [{
          keyId: 1,
          keyName: 'Midterm',
          answers: 'answerstring'
        },{
          keyId: 2,
          keyName: 'Final Exam',
          answers: 'answerstring2'
        },{
          keyId: 1,
          keyName: 'Precourse',
          answers: 'answerstring3'
        },{
          keyId: 2,
          keyName: 'Quiz 1',
          answers: 'answerstring4'
        }]
      }
    }
  }

  handleCoursePress() {
    console.log(this.props)
  }

  render() {
    var keys = this.state.courseData.answerKeys;

    var keyEntries = keys.map(key => 
      <KeyEntry course={key}/>
    )

    return (
      <ScrollView style={styles.outerContainer}>
        {keyEntries}
      <CreateKeyEntry />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ADC986',
  },
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
  courseText: {
    fontSize: 20,
    paddingTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});