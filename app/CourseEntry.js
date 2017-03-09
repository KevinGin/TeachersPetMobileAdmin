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

export default class CourseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleCoursePress() {
    var user = this.props.user;  // Don't need userId when server reads off token
    var course = this.props.course
    var data = {user:user, course:course};
    Actions.Keys(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.courseButton}
          onPress={this.handleCoursePress.bind(this)}
          accessibilityLabel="Course Name">
          <Text style={styles.courseText}>{this.props.course.ClassName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

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
  courseText: {
    fontSize: 20,
    paddingTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});