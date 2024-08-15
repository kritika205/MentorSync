// Login.js
import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Cal from './Cal';
//import Teacher from './Teacher';
import Teach from './Teach';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      un: "",
      pass: "",
      userType: "",
      st: false,
      role:"",
      userData: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUserTypeChange = (e) => {
    this.setState({ userType: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { un, pass, userType } = this.state;
    const userData = { un, pass, userType };

    axios.post('http://localhost:8081/check', userData)
      .then((response) => {
        console.log('Response from the server:', response.data);
        const success = response.data.success;
        const role1 = response.data.role;
        console.log(role1);
        if (success) {
          this.setState({
            st: true,
            role:role1,
            mn: un, 
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div>
        {this.state.role==="teacher" ? (
          <Teach user1={this.state.mn} /> 

        ) :(
          this.state.role==="stu")?( <Cal user1={this.state.mn}/>      )     :(
          <div className="login-container">
            <h1>MentorSync</h1>
            <h1>Welcome Back!</h1>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="un">Username:</label>
                <input type="text" name="un" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select name="userType" value={this.state.userType} onChange={this.handleUserTypeChange} className="large-dropdown">
                  <option value="student">Employee</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;


/*import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Cal from './Cal';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      un: "",
      pass: "",
      userType: "",
      st: false,
      mn: "",
      lockedDates: [], 
    };
  }

  componentDidMount() {
    const { userType, un } = this.state;

    if (userType === 'student' || userType === 'teacher') {
      axios.post('http://localhost:8081/getLockedDates', { userType, username: un })
        .then((lockResponse) => {
          console.log('Locked Dates Response:', lockResponse.data);

          this.setState({ lockedDates: lockResponse.data.lockedDates });
        })
        .catch((lockError) => {
          console.error('Locked Dates Error:', lockError);
        });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUserTypeChange = (e) => {
    this.setState({ userType: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { un, pass, userType } = this.state;
    const userData = { un, pass, userType };

    axios.post('http://localhost:8081/check', userData)
      .then((response) => {
        console.log('Response from the server:', response.data);
        const success = response.data.success;
        if (success) {
          this.setState({
            st: true,
            mn: un, 
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  renderStudentDashboard() {
    // Render student dashboard elements
    return (
      <div>
        <Cal user1={this.state.mn} userType={this.state.userType} />
      </div>
    );
  }

  renderTeacherDashboard() {
    // Render teacher dashboard elements
    return (
      <div>
        <h2>Teacher Dashboard</h2>

      </div>
    );
  }

  render() {
    const { st, userType } = this.state;

    return (
      <div>
        {st ? (
          userType === 'student' ? (
            this.renderStudentDashboard()
          ) : (
            this.renderTeacherDashboard()
          )
        ) : (
          <div className="login-container">
             <h1>Welcome Back!</h1>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="un">Username:</label>
                <input type="text" name="un" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select name="userType" value={this.state.userType} onChange={this.handleUserTypeChange} className="large-dropdown">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;



// Login.js (Updated)
/*import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Cal from './Cal';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      un: "",
      pass: "",
      userType: "",
      st: false,
      mn: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUserTypeChange = (e) => {
    this.setState({ userType: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { un, pass, userType } = this.state;
    const userData = { un, pass, userType };

    axios.post('http://localhost:8081/check', userData)
      .then((response) => {
        console.log('Response from the server:', response.data);
        const success = response.data.success;
        if (success) {
          this.setState({
            st: true,
            mn: un, 
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleSignup = () => {
    const { un, pass, userType } = this.state;
    const userData = { un, pass, userType };

    axios.post('http://localhost:8081/signup', userData)
      .then((response) => {
        console.log('Signup Response:', response.data);
        
      })
      .catch((error) => {
        console.error('Signup Error:', error);
      });
  }

  render() {
    return (
      <div>
        {this.state.st ? (
          <Cal user1={this.state.mn} userType={this.state.userType} /> 
        ) : (
          <div className="login-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="un">Username:</label>
                <input type="text" name="un" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" onChange={this.handleInputChange} className="small-input" />
              </div>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select name="userType" value={this.state.userType} onChange={this.handleUserTypeChange} className="large-dropdown">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
*/


