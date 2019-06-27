import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'



class App extends Component {
  

  state = {
    store: STORE
    
  }
  

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }
 
  handleDeleteCard = (currentId) => {
    console.log('handleDelete ran')
    
    let newCardList = this.state.store.lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== currentId)

    }))

    const newCards = this.omit(this.state.store.allCards, currentId);

    this.setState({
      store: {
        lists: newCardList,
        allCards: newCards,

      }
    }) 

  }
  
   


  handleAddCard = () => {


    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }

    console.log('handleAdd ran')

    console.log(newRandomCard());

    const newCard = newRandomCard();

    console.log(newCard);
  
    // newCard = this.newRandomCard;

    let newCardId = this.state.store.lists.map(list => ({
      ...list,
      cardIds: [...list.cardIds, newCard.id]

    }))

    console.log(newCardId);

    const allCar = {
      ...this.state.store.allCards,
      [newCard.id]: newCard
    }

    console.log(allCar);


    this.setState({
      store:{
        lists: newCardId,
        allCards: allCar
      }
    })
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
              id ={list.id}              
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteClick={this.handleDeleteCard}
              addClick={this.handleAddCard}

            />
            
          ))}
          
        </div>
      </main>
    );
  }
}

export default App;
