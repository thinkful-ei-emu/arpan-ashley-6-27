import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'



class App extends Component {
  

  state = {
    store: STORE
    
  }
  
  handleDeleteCard = () => {
    console.log('handleDelete ran')
    
    let newCardList = this.state.store.lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id === this.state.store.allCards[id])

    }))


    this.setState({
      store: {
        lists: newCardList,
        allCards: {},

      }
    }) 
    console.log(this.state);   

  }
  

  render() {

    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}              
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteClick={this.handleDeleteCard}

            />
            
          ))}
          
        </div>
      </main>
    );
  }
}

export default App;
