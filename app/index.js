import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Landing from './Landing';
import CameraView from './Camera';
import Preview from './Preview';
import PreSignup from './PreSignup';
import Signup from './Signup';
import Login from './Login';
import PreCamera from './PreCamera';
import SuccessfulPost from './SuccessfulPost';
import FailedToPost from './FailedToPost';
import Courses from './Courses';
import Keys from './Keys';



export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Landing" component={Landing} title="Teacher's Pet: Student" hideNavBar initial={true}/>
          <Scene key="CameraView" component={CameraView} title="Camera" hideNavBar />
          <Scene key="PreSignup" component={PreSignup} title="PreSignup" />
          <Scene key="Signup" component={Signup} title="Signup" />
          <Scene key="Login" component={Login} title="Login"  />
          <Scene key="PreCamera" component={PreCamera} title="PreCamera" />
          <Scene key="SuccessfulPost" component={SuccessfulPost} title="SuccessfulPost" hideNavBar/>
          <Scene key="FailedToPost" component={FailedToPost} title="FailedToPost" hideNavBar/>
          <Scene key="Preview" component={Preview} title="Preview" hideNavBar/>
          <Scene key="Courses" component={Courses} title="Courses" hideNavBar  />
          <Scene key="Keys" component={Keys} title="Keys" hideNavBar />
        </Scene>
      </Router>
    )
  }
}