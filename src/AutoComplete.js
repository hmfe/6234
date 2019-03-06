import React, { Component } from 'react'
import axios from 'axios';
import localStorage from 'local-storage'
import './AutoCompleteText.css'

import SelectedSuggestions from './SelectedSuggestions'

export default class AutoComplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      text: '',
      suggestionSelected: [],
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
      this.setState({suggestionSelected: this.getLocalStorage()})  
  }
  
  onTextChange = (e) => {
    const value = e.target.value;
    const wikiUrl = 'https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&search=' + value
    let suggestions = []

    if (value === '') {
      this.setState({ suggestions: [], text: value})
    } else {
        this.setState({ isLoading: true})
        fetch(wikiUrl)
          .then( response => {
            if (!response.ok) { 
                this.setState({
                error: response,
                isLoading: false
              })
             } else {
                response.json().then( data => {
                  suggestions = data[1].map(item => item);
                  
                  this.setState({
                    suggestions: suggestions,
                    isLoading: false
                  })
                })
             }
          })
          .catch( (err) => {
            console.log("Fetch Error!!", err);
            this.setState({
              isLoading: false,
              error: err
            })
          });
    }
    this.setState({ text: value })
    
  }

  reqForSuggestionApi = async value => {
    this.setState({ isLoading: true})
    const response = await axios('https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&search=' + value)
    // console.log(response)
    const suggestions = await response.data[1].map(item => item);
    this.setState({
      suggestions: suggestions,
      isLoading: false
    })
  }

  handleSearchTextChange= async e => {
    const value = e.target.value
    if (value === '') {
      this.setState({ suggestions: [], text: value})
    } else {
      this.reqForSuggestionApi(value)
      this.setState({
        text: value
      })
    }
  }

  getLocalStorage = () => {
    const localStorageData = localStorage.get('searchItems')
    if(localStorageData === null) {
      return []
    } else return localStorageData
  }

  handleRemove = (itemIndexToRemove) => {
    const itemList = [...this.state.suggestionSelected];
    itemList.splice(itemIndexToRemove, 1);
    this.setState({suggestionSelected: itemList});

    localStorage.set('searchItems', itemList);
  }

  handleRemoveAll = () => {
    this.setState({suggestionSelected: []});
    localStorage.set('searchItems', []);
  }

  onSuggestionSelected = (value) => {
    // var joined = this.state.suggestionSelected.concat(value);
    var newItem = {[+(new Date())]: value}
    this.setState( () => ({
      text: '',
      suggestions: [],
      suggestionSelected: [...this.state.suggestionSelected, newItem]
    }))
    var suggestionSelectedForLocalStorage = this.getLocalStorage()
    suggestionSelectedForLocalStorage.push(newItem)
    localStorage.set('searchItems', suggestionSelectedForLocalStorage);
  }

  renderSuggestions () {
    const { suggestions } = this.state
    if(suggestions.length === 0) {
      return null
    }

    return (
        <ul className="suggestionLists">
          { suggestions.map( (item, index) => <li key={index} onClick={() => this.onSuggestionSelected(item)}>{item}</li>)}
        </ul>
    )
  }

  render() {
    const { text, isLoading, error } = this.state
    return (
      <div className="AutoCompleteText">
        <div className="InputAndSuggestionContainer">
          <input value={text} onChange={e => this.handleSearchTextChange(e)} type="text"/>
          <div className="suggestionListsContainer">
            {error ? <h3>{error.message}</h3> : null} 
            { 
              !isLoading ? (this.renderSuggestions()) 
              : 
              (<h3>Loading...</h3>)
            } 
          </div>
        </div>
        <SelectedSuggestions suggestionSelected={this.state.suggestionSelected} 
          handleRemove={this.handleRemove}
          handleRemoveAll={this.handleRemoveAll}
        />
      </div>
    )
  }
}
