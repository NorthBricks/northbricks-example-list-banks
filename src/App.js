import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
const API = 'https://api.northbricks.io/api/v1';
const DEFAULT_QUERY = '/banks';
const defaultOptions = {
  headers: {
    'Authorization': 'Bearer aa8f435a-cc41-4630-8bc9-902998bb1cf6',
  },
};
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banks: [],
      myBanks: [],
    };


  }

  render() {

    function SimpleCard(bank) {

      const { classes } = styles;
      // const bull = <span className={styles.bullet}>•</span>;

      return (
        <Card className={styles.card}>
          <CardContent className={styles.title}>
            {bank.fullName} <div className="bankId"> {bank.id}</div>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small"> {bank.website}</Button>
          </CardActions>
        </Card>
      );
    }

    function RenderButton(name) {
      return (
        <Button variant="outlined" color="primary">
          {name}
        </Button>
      );
    }
    return (

      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Northbricks LIVE</h1>
        </header>
        <div className="DemoBody">
          <div className="Banks">
            <div className="Title">All banks</div>
            {this.state.banks.map(function (name, index) {
              return SimpleCard(name);
            })}
          </div>
          <div className="Title">My banks</div>
          <div className="Banks">
            {this.state.myBanks.map(function (name, index) {
              return SimpleCard(name);
            })}
          </div>
        </div>
      </div>
    );
  }

  getMyBanks() {

    fetch(API + '/me/banks', { headers: { 'Authorization': 'Bearer aa8f435a-cc41-4630-8bc9-902998bb1cf6' } })
      .then(response => response.json())
      .then(data => this.setState({ myBanks: data.banks }));
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY, { headers: { 'Authorization': 'Bearer aa8f435a-cc41-4630-8bc9-902998bb1cf6' } })
      .then(response => response.json())
      .then(data => this.setState({ banks: data.banks }))
      .then(this.getMyBanks());


  }


}



export default App;
