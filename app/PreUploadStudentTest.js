import React, { Component } from 'react';
import { 
	View,
	Text,
  Image,
	StyleSheet,
  TouchableOpacity,
  Dimensions
 } from 'react-native';
 const { width, height } = Dimensions.get('window');
 import { Actions } from 'react-native-router-flux';



export default class PreUploadStudentTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonPress() {
    var keyId = this.props.keyId
    var data = {keyId: keyId}
    Actions.CameraView(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space} />
        <Text style={styles.textMajor}>Upload Student Tests</Text>
        <Text style={styles.textMinor}>You'll be outa here in no time.</Text>
        <Image source={require('./assets/pencil-horizontal.png')}
           style={styles.pencil}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleButtonPress.bind(this)}
            accessibilityLabel="Navigate to Camera">
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
      </View>
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
    backgroundColor: '#D3E2BD',
    justifyContent: 'center',
  },
  thinSpace: {
    flex: .25,
  },
  space: {
    flex: 1,
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
    fontSize: 45,
    textAlign: 'center'
  },
  textMinor: {
    color: '#85AF4B',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  buttonContainer: {
    flex: .8,
    paddingTop: height / 20,
    height: height / 6,
    backgroundColor: '#D3E2BD',
  },
  button: {
    paddingTop: height / 25,
    flex: 1,
    backgroundColor: '#85AF4B',
    borderRadius: 4,
    width: width * .6,
    left: width / 5
  },
  buttonText: {
    fontSize: 20,
    paddingTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }


})