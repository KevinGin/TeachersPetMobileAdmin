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

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: {}
    }
  }



  componentDidMount() {
    this.getCourses();
  }


  getCourses() {
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {
      var config = {
        method: 'get',
        url: 'http://10.7.24.223:8080/api/getClasses?token=' + token
      }
      axios(config)
        .then((data) => {
          console.log('about to print data ---------------------')
          // console.log(data.request._response);
          var courses = JSON.parse(data.request._response)
          courses.forEach((course) => {
            console.log(course);
          })
          this.setState({
            courses: courses
          })
        })
        .catch((err) => {
          console.log('ERROR - catch called in Courses.js')
        })
    })
  }

  showState() {
    var context = this;
    console.log(context.state);
  }

  render() {
    return (
      <ScrollView styles={styles.container}>
        <TouchableOpacity
          style={styles.courseButton}
          onPress={this.showState.bind(this)}
          accessibilityLabel="Course Name">
          <Text style={styles.courseText}>Bio 101</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.courseButton}
          onPress={this.showState.bind(this)}
          accessibilityLabel="Course Name">
          <Text style={styles.courseText}>Phil 08</Text>
        </TouchableOpacity>
        <View style={styles.space}/>
      </ScrollView>
    )
  }
}


// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADC986',
  },

  thinLine: {
    height: 1,
  },
  mediumLine: {
    height: 5
  },
  space: {
    flex: 3
  },
  courseButton: {
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