import logo from './img/nate.png';
import './App.css';
import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.componet';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
    console.log("Constructor Ran")
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((Response) => Response.json())
    .then((users) =>
    this.setState(
      () => {
        return {monsters: users };
      },
      () => {
        console.log(this.state);
      }
    ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
          
    this.setState(() => {
      return { searchField };

    });
  };


  render() {
    console.log('Render Ran');

    //destructuring so we don't have to use this. everywhere 
    const { monsters , searchField } = this.state;
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
      {/*}  {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
            <h1>{monster.name}</h1>
            </div>
            );
            })}  */}
        <SearchBox onChangeHandler={onSearchChange} placeholder="Search Monsters"  className='monster-search-box'/>
        <CardList monsters={filteredMonsters} />
     </div>
  );
}
}

export default App;
