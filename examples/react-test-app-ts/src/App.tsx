import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Client } from 'contensis-delivery-api';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      project: null
    };
  }

  componentDidMount() {

    let client = Client.create({
      accessToken: 'xxxxx',
      projectId: 'website',
      rootUrl: 'https://cms-example.cloud.contensis.com'
    });
    client.project.get().then(project => {
      this.setState({
        isLoaded: true,
        project: project
      });
    },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, project } = this.state as any;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Connected to Contensis project {project.name}
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }

}

export default App;
