import React, { Component } from 'react';
import { 
	View,
	Text,
  Image,
	StyleSheet,
  TouchableOpacity, 
  Dimensions
 } from 'react-native';
 const { width, height } = Dimensions.get('window')
 import { Actions } from 'react-native-router-flux';
 import AnswerDisplay28 from './AnswerDisplay28';

export default class SuccessfulKeyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleHomePress() {
    var user = this.props.user;
    Actions.Courses(user);
  }

  handleButtonPress() {
    // console.log('handleButtonPress called ---------------')
    var props = this.props;
    var user = props.user; 
    var course = props.course;  // yes -- course.className
    var keyName = props.keyName; // yes
    var isKey = false;
    var keyId = props.keyData.id;

    var propData = {
      user:user,
      course:course,
      keyName:keyName,
      isKey:isKey,
      keyId:keyId,
    }

    Actions.CameraView(propData)
  }

  render() {
    var props = this.props;
    var className = props.course.ClassName;
    var keyName = props.keyName;
    var key = props.keyData;
    var keyId = key.id;
    var answers = JSON.parse(key.answers);


    return (
      <View style={styles.container}>
        <View style={styles.thinSpace} />
        <Text style={styles.textMajor}>{className}</Text>
        <Text style={styles.textMinor}>{keyName} (id: {keyId})</Text>
        <Image source={require('./assets/pencil-horizontal.png')}
               style={styles.pencil}
               />
        <AnswerDisplay28 answers={answers}/>  
        <View style={styles.thinSpace} />      
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={this.handleHomePress.bind(this)}
            accessibilityLabel="Navigate to Courses">
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpace} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleButtonPress.bind(this)}
            accessibilityLabel="Grade Another">
            <Text style={styles.buttonText}>Upload Tests for {keyName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.thinSpace} />
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
    backgroundColor: '#D3E2BD',
    justifyContent: 'center',
  },
  keyContainer: {
    flex: 4,
  },
  space: {
    flex: 1,
  },
  thinSpace: {
    flex: .25,
  },
  indicator: {
    flex: 2,
  },
  pencil: {
    left: (width / 2) - 75
  },
  textMajor: {
    color: '#85AF4B',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center'
  },
  textMinor: {
    color: '#85AF4B',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  textMinorAlternate: {
    color: '#85AF4B',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  textPercentage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    // paddingTop: height / 20,
    width: width * .95,
    left: width * .05,
    height: height / 6,
    backgroundColor: '#D3E2BD',
  },
  buttonSpace: {
    width: width * .1,
  },
  button: {
    // paddingTop: height / 25,
    width: width * .5,
    backgroundColor: '#85AF4B',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 19,
    // paddingTop: height / 200,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  homeButton: {
    // paddingTop: height / 25,
    width: width * .3,
    backgroundColor: '#ADC986',
    borderRadius: 4,
  },
  homeButtonText: {
    fontSize: 19,
    paddingTop: height / 80,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }

})