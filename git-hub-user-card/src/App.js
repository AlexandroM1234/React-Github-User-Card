import React from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

const Card = styled.div`
  border: solid 2px red;
  margin: 2% 0;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      myGithub: [],
      followers: []
    };
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/AlexandroM1234").then(response => {
      this.setState({
        myGithub: response.data
      });
      console.log(this.state.myGithub);
    });
    axios
      .get("https://api.github.com/users/AlexandroM1234/followers")
      .then(response => {
        console.log(response.data);
        this.setState({
          followers: response.data
        });
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <img src={this.state.myGithub.avatar_url} alt="me" />
          <h1>{this.state.myGithub.login}</h1>
          <p>followers: {this.state.myGithub.followers}</p>
        </Card>
        {this.state.followers.map(follower => {
          return (
            <Card>
              <img src={follower.avatar_url}></img>
              <p>{follower.login}</p>
            </Card>
          );
        })}
      </Container>
    );
  }
}

export default App;
