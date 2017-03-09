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

export default class AnswerDisplay28 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var answerObject = this.props.answers;
    var answersLeft = [];
    var answersRight = [];
    for (var i = 1; i <= 14; i ++) {
      answersLeft.push(answerObject[i]);
    }
    for (var i = 15; i <= 28; i ++) {
      answersRight.push(answerObject[i]);
    }
    var leftColumn = answersLeft.map((answer,index) => 
        <View style={styles.answerContainer}>
          <Text style={styles.answerNumber}>{index < 9 ? '  ' + (index+1).toString() + '.' : index+1 + '.'}</Text>
          <Text style={answer.includes('a') ? styles.answerText : styles.answerTextUnanswered}> A </Text>
          <Text style={answer.includes('b') ? styles.answerText : styles.answerTextUnanswered}> B </Text>
          <Text style={answer.includes('c') ? styles.answerText : styles.answerTextUnanswered}> C </Text>
          <Text style={answer.includes('d') ? styles.answerText : styles.answerTextUnanswered}> D </Text>
          <Text style={answer.includes('e') ? styles.answerText : styles.answerTextUnanswered}> E </Text>
        </View>
      )

    var rightColumn = answersRight.map((answer,index) => 
        <View style={styles.answerContainer}>
          <Text style={styles.answerNumber}>{index+15 + '.'}</Text>
          <Text style={answer.includes('a') ? styles.answerText : styles.answerTextUnanswered}> A </Text>
          <Text style={answer.includes('b') ? styles.answerText : styles.answerTextUnanswered}> B </Text>
          <Text style={answer.includes('c') ? styles.answerText : styles.answerTextUnanswered}> C </Text>
          <Text style={answer.includes('d') ? styles.answerText : styles.answerTextUnanswered}> D </Text>
          <Text style={answer.includes('e') ? styles.answerText : styles.answerTextUnanswered}> E </Text>
        </View>
      )




    return (
      <View style={styles.container}>
        <View style={styles.columnContainer}>
          {leftColumn}
        </View>
        <View style={styles.columnContainer}>
          {rightColumn}
        </View>
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
    flex: 14,
    flexDirection: 'row',
    backgroundColor: '#D3E2BD',
    justifyContent: 'center',
  },
  answerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  columnContainer: {
    flex: 1,
    backgroundColor: '#D3E2BD',
  },
  answerNumber: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 19,  // DEV: adjust font size with respect to screen height
  },
  answerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 19,  // DEV: adjust font size with respect to screen height
  },
  answerTextUnanswered: {
    color: '#C9D492',
    fontWeight: 'bold',
    fontSize: 19,  // DEV: adjust font size with respect to screen height
  }
})