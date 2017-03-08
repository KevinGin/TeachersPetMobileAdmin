import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from './Spinner.js'
import Preview from './Preview.js'
import { Actions } from 'react-native-router-flux';
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')

const Item = Picker.item;

export default class CameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // answerKeyID: 1,       // note: answerKeyID, studentID passed in as Props
      spinner: false,
      majorMessage: '',
      minorMessage: ''
    };
  }

  takePicture() {
    var context = this;
    this.camera.capture()
      .then((data) => {
        console.log('picture taken --------------------')
        context.setState({
          majorMessage: 'Uploading Image',
          minorMessage: 'Let\s do this!',
          spinner: true
        })
        console.log('should have gone to spinner -------------')
        // DEVNOTE: commented out during dev so don't make unnecessary API requests
        context.uploadImage(data.path);
      })
      .catch(err => console.error(err));
  }

  uploadImage(uri) {
    console.log('uploading image to Cloudinary -------------------')
    var context = this;
    // DEV NOTE: On future iterations, we can upload without an API Key (and without hashing it with our secret)
    // But in order to do that, we'll need to set up a Cloudinary PRESET for us to upload to.
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = Cloudinary['api_key']
    let api_secret = Cloudinary['api_secret']
    let cloud = Cloudinary['cloud_name']
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = (data) => {
      console.log('onload called -------------------------')

      var response = data.target._response;
      // DEV NOTE: removing username...
      // var username = this.props.user.username;

      var keyId = this.props.keyId

      Actions.Preview({
        cloudinaryResponse:response,
        // username: username,
        keyId: keyId
      })

      // set state in case user navigates back to CameraView
      context.setState({
        spinner: false,
      })

    };
    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/jpg', name: 'upload.jpg'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }


  

//For Debugging:
  // sample() {
  //   var context = this;
  //   console.log(this.props)
  // }


  fetch() {
    console.log('fetch called')
    AsyncStorage.getItem('@teachersPetToken', (err, data) => console.log(data));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.spinner ? 
          <Spinner majorMessage={this.state.majorMessage} minorMessage={this.state.minorMessage}></Spinner> :
          <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          //aspect as fit crops viewfinder, helps ensure uploaded image has right aspect ratio
          aspect={Camera.constants.Aspect.fill}
          //iOS will always give 720x1280
          //Most Android will sive the same, but might need to edit on Cloudinary for rogue Android cameras
          captureQuality={"720p"}>
          <View style={styles.topBar}>
            <Text></Text>
          </View>
          
          <View style={styles.outline}></View>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>   [Snap Photo
          ]   </Text>
        </Camera>
        }
      </View>
    );
  }
}

// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#85AF4B',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    margin: 40
  },
  outline: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ADC986',
    borderRadius: 10,
    borderWidth: 3,
    width: 280,
    flex: 5
  },
  topBar: {
    flex: 1,
  }
});