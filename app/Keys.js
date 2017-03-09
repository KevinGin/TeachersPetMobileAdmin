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
      courseData: {}
    }
  }
      // Example courseData, as passed back from Server.
      // courseData: {
      //   classId: 2,
      //   classname: 'Badminton 101',
      //   answerkey: [{
      //     keyId: 1,
      //     keyName: 'Midterm',
      //     answers: 'answerstring'
      //   },{
      //     keyId: 2,
      //     keyName: 'Final Exam',
      //     answers: 'answerstring2'
      //   }]
      // }

  componentDidMount() {
    console.log('component mounted')
    // var props = this.props;
    // var courseId = this.props.course.ClassId;
    

    // // for (key in this.props) {
    // //   console.log(key);
    // // }

    // console.log(courseId)
    this.getKeys();
  }


// http://localhost:8080/api/getKeysForClass?class_Id=8&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJzYW1wbGUiLCJ1c2VydHlwZSI6InRlYWNoZXIiLCJ1c2VySWQiOjIsImlhdCI6MTQ4OTA5NzU5MSwiZXhwIjoxNDg5MTMzNTkxfQ.LEEoi49DULgtk0f1_BHh_jsOCo_evmNMcuwBqgMzQaU

  getKeys() {
    var context = this;
    var classId = this.props.course.ClassId;

    console.log('getKeysCalled')
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {
      var config = {
        method: 'get',
        url: 'http://computer-vision.herokuapp.com/api/getKeysForClass?token=' + token +'&class_Id=' + classId
      }
      axios(config)
        .then((data) => {
          console.log('getKeys success 2')
          // console.log(data.request._response);
          var courseData = JSON.parse(data.request._response)
          
          console.log('courseData did not throw error 2')
          console.log(courseData);
          context.setState({
            courseData: courseData
          })


          console.log('set State successfully')
        })
        .catch((err) => {
          // ERROR HANDLING
          console.log('ERROR - catch called in Courses.js')
        })
    })
  }

  render() {
    var user = this.props.user;
    var course = this.props.course;
    var keys = this.state.courseData.answerkey || [];

    var keyEntries = keys.map(key => 
      <KeyEntry course={key}/>
    )

    return (
      <ScrollView style={styles.outerContainer}>
        {keyEntries}
      <CreateKeyEntry user={user} course={course} />
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