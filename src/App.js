import React, { Component } from 'react';
import './App.css';
import Tooltip from './tooltip/Tooltip';
import Filtering from './filtering/Filtering';
import Tabpanel from './tabpanel/Tabpanel';
import Message from './simple/message';
import Accordion from './simple/accordion';
import Todo from './simple/todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.options = [
        {name: 'Abobrinha'},
        {name: 'Abacate'},
        {name: 'Macaxeira'},
        {name: 'Melão'},
        {name: 'Uva'},
        {name: 'Pepino'},
        {name: 'Abacaxi'},
        {name: 'Chuchu'},
        {name: 'Banana'},
        {name: 'Maçã'},
    ];
    this.panel_props = [
        {
            title: "Frutas",
            body: (
                <ul>
                    <li>Maçã</li>
                    <li>Uva</li>
                    <li>Banana</li>
                </ul>
            )
        },
        {
            title: "Legumes",
            body: (
                <ul>
                    <li>Ervilha</li>
                    <li>Abobrinha</li>
                    <li>Vagem</li>
                </ul>
            )
        }
    ];
  }

  render() {
    return (
      <div className="App">
        <Tooltip content="Super legal esse negócio de components" more="super legal" time={300}/>
        <Filtering options={this.options} />
        <Tabpanel structure={this.panel_props}/>
        <Message button="Click" message="Super legal!!!" />
        <Accordion />
        <Todo />
      </div>
    );
  }
}

export default App;
