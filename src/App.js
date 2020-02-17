import React, { Component } from 'react';
import Table from './components/Table/Table';
import './App.css';

class App extends Component {
  state = {
    data: []
  };
  
  getData = () => {
    fetch('http://localhost:3000/pens')
    .then(res => res.json())
    .then(res => this.setState({ data: res }))
    .catch(e => e);
  }

  isolatedPenHandler = val => {
    return val ? "TAK" : "NIE";
  };
  
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        {this.state.data.map((data, index) => (
         <Table
         key={index}
         index={data.id}
         size={data.size}
         isolated={this.isolatedPenHandler(data.isolated)}
         >
         </Table>
        ))}
      </div>
    );
  }
}

export default App;
