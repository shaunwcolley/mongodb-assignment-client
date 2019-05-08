import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      body: '',
      tag: '',
      snippetItems: []
    }
  }

  componentDidMount(){
    this.fetchSnippets()
  }

  handleAddSnippetClick = () => {
    console.log('handleAddSnippetClick')
  }

  handleDeleteClick = () => {
    console.log('handleDeleteClick')
  }

  handleUpdateClick = (id) => {
    let url = '/update/' + id
    this.props.history.push(url)
  }

  fetchSnippets = () => {
    axios.get('http://localhost:8080/api/snippets')
    .then(response => {
      let snippets = response.data.snippets
      let snippetItems = snippets.map((snippet) => {
        return(
          <li key={snippet._id}>
            <h3>{snippet.title}</h3>
            <p>{snippet.body}</p>
            <p>{snippet.tag}</p>
            <button onClick={this.handleDeleteClick}>Delete</button><button onClick={() => this.handleUpdateClick(snippet._id)}>Update</button>
          </li>
        )
      })
      this.setState({
        snippetItems: snippetItems
      })

    })
  }

  render(){
    return(
      <div>
        <div>
          <input type="text" name="title" />
          <textarea name="body"/>
          <select name="tag">
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C#">C#</option>
            <option value="C++">C++</option>
            <option value="Swift">Swift</option>
          </select>
          <button onClick={this.handleAddSnippetClick}>Add Snippet</button>
        </div>
        <div>
        <ul>{this.state.snippetItems}</ul>
        </div>
      </div>
    )
  }
}

export default App;
