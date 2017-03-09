import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from './Spinner.js';
import { Actions } from 'react-native-router-flux';
import SuccessfulPost from './SuccessfulPost.js'
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')
const { width, height } = Dimensions.get('window')

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {    // note: answerKeyID, studentID passed in as Props
      spinner: false,
      majorMessage: '',
      minorMessage: ''
    };
  }


  discardImage() {
    Actions.pop();
  }

  useImage() {
    var context = this;
    var cloudinaryResponse = JSON.parse(context.props.cloudinaryResponse);
    var cloudURL = cloudinaryResponse.url;

    if (this.props.isKey) {
      console.log('KEY ========================')
      this.postAnswerKey(cloudURL);
    } else {
      this.postStudentTest(cloudURL);
    }
  }

  postAnswerKey(cloudURL) {
    this.setState({
      spinner: true,
      majorMessage: 'Scanning Key',
      minorMessage: 'Hey Teacher! You\'re the best...'
    })
    var context = this;
    console.log('posting to server ------------------------')
    // Fetch Web Token Asyc
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {

      // let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'
      let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg'

      // DEV: When server changes are made, should also pass up USER ID, not USERNAME. Hard Coded UserID for now.
      
      var TeacherId = context.props.user.id;
      var ClassId = context.props.course.ClassId;
  
      var data = {
        url: hardCodedURL,   // hard-coded for DEV
        TeacherId: TeacherId,
        ClassId: ClassId,
        token: token
      }

      var config = {
        method: 'post',
        data: data,
        url: 'http://10.6.20.164:8080/api/addAnswerKey'
      }

      axios(config)
        .then((response) => {
          console.log('posted successfully --------------------⁄')
          var data = response.data;
          this.setState({
            spinner: false,
          })
          // Actions.SuccessfulPost(data);

        })
        .catch((err) => {
          console.log('catch called -------------------------')
          this.setState({
            spinner: false,
          })

          // Actions.FailedToPost(data);
        })
    });
  }






  postStudentTest(cloudURL) {
    this.setState({
      spinner: true,
      majorMessage: 'Grading Test',
      minorMessage: 'Kick your feet up, relax...'
    })
    var context = this;
    console.log('posting to server ------------------------')
    // Fetch Web Token Asyc
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {

      // let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'
      let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg'

      // DEV: When server changes are made, should also pass up USER ID, not USERNAME. Hard Coded UserID for now.
      console.log('about to upload data ------------------------------------------------------------------------------------')
      // var username = this.props.username;
      var keyId = this.props.keyId;

      console.log('answerKeyID ==> ')
      console.log(keyId)

      var data = {
        url: hardCodedURL,   // hard-coded for DEV
        // url: cloudURL,
        AnswerKeyId: keyId,
        StudentId: 1,  // hard-coded for DEV, until server doesn't require.
        token: token
      }

      console.log('data =====>');
      console.log(data);

      var config = {
        method: 'post',
        data: data,
        url: 'http://10.6.20.164:8080/api/addTest'
      }

      axios(config)
        .then((response) => {
          console.log('posted successfully --------------------⁄')
          var data = response.data;
          this.setState({
            spinner: false,
          })
          Actions.SuccessfulPost(data);

        })
        .catch((err) => {
          console.log('catch called -------------------------')
          this.setState({
            spinner: false,
          })

          Actions.FailedToPost(data);
        })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.spinner ? 
          <Spinner majorMessage={this.state.majorMessage} minorMessage={this.state.minorMessage}></Spinner> :
          <View>
          <View style={styles.space}></View>
          <Image source={{uri: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'}}
                 style={styles.image} />
          <View style={styles.buttonContainer}>
            <View style={styles.space}></View>
            <TouchableOpacity
              style={styles.button}
              onPress={this.discardImage.bind(this)}>
              <Text style={styles.goBackText}> {'\<-- Discard'}</Text>
            </TouchableOpacity>
            <View style={styles.space}></View>
            <TouchableOpacity
              style={styles.button}
              onPress={this.useImage.bind(this)}>
              <Text style={styles.submitText}>{this.props.isKey ? 'Upload Key' : 'Submit Test'}</Text>
            </TouchableOpacity>
            <View style={styles.space}></View>
          </View>
          <View style={styles.space}></View>
          </View>
        }
      </View>
    );
  }
}


// Possible Arrow Images (each listed for commercial use)
// https://pixabay.com/p-1646213/?no_redirect
// http://downloadicons.net/sites/default/files/returns--button-icon-68858.png


// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'
// '#C9D492'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3E2BD',
    alignItems: 'center',
  },
  space: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 400
  },
  button: {
    flex: 4.5,
    // backgroundColor: 'blue'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
  },
  goBackText: {
    flex: 1,
    color: '#666666',
    backgroundColor: 'lightgray',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 12,
    borderRadius: 4,
  },
  submitText: {
    flex: 1,
    color: 'white',
    backgroundColor: '#85AF4B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 12,
    borderRadius: 4,
  },
});