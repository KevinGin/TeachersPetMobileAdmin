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
import CourseEntry from './CourseEntry';
import CreateCourseEntry from './CreateCourseEntry';
const axios = require('axios')
const { width, height } = Dimensions.get('window')

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    this.getCourses();
    console.log('Courses Mounted, props =======================>')
    for (key in this.props) {
      console.log(key);
    } 
  }

  getCourses() {
    console.log('getCoursesCalled')
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {
      var config = {
        method: 'get',
        url: 'http://10.7.24.223:8080/api/getClasses?token=' + token
      }
      axios(config)
        .then((data) => {
          console.log('getCourses success')
          // console.log(data.request._response);
          var courses = JSON.parse(data.request._response)
          this.setState({
            courses: courses
          })
        })
        .catch((err) => {
          // ERROR HANDLING
          console.log('ERROR - catch called in Courses.js')
        })
    })
  }

  showState() {
    var context = this;
    console.log(context.state);
  }

  render() {
    var user = this.props.user
    var courses = this.state.courses;

    var entries = this.state.courses.map(course => 
      <CourseEntry course={course} user={user}/>
    )

    return (
      <ScrollView style={styles.outerContainer}>
        {entries}
      <CreateCourseEntry user={user}/>
      </ScrollView>
    )
  }
}







// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'
// '#C9D492'

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
    paddingTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});