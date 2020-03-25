import React, { Component } from 'react';
import './App.css';

const API_HOST = 'http://localhost:8000/api/';

class App extends Component {
  state = {
    datas: [],
    switchA: false,
    switch2: true,
    switchB: true,
    switchR: false,
  }

  boastOnlyButton = () => {
    let result = this.state.switchB
    this.setState({ switchB: !result })
  }

  roastsOnlyButton = () => {
    let result = this.state.switchR;
    this.setState({ switchR: !result })
  }

  getAllBoastsHandler = () => {

    let OnOff = this.state.switchA
    this.setState({switchA: !OnOff})
    // let meth_head = {
    //   method: "GET",
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // }

    // fetch( API_HOST + 'boastroast/', meth_head)
    // .then(response => response.json())
    // .then(responseData => {
    //   console.log(responseData)
    //   this.setState({
    //     status: [responseData],
    //     switch: !OnOff
    //   })
    // })
    // .catch( error => {
    //   console.log("Error: ", error)
    // })
  }

  
  boastroastHandler = () => {
    let result = this.state.switch2
    this.setState( { switch2: !result })
  }

  // createBoastHandler = () => {
  //   let meth_head = {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //   }
  // }

  componentDidMount(){ 
    let meth_head = {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    }

    fetch( API_HOST + 'boastroast/', meth_head)
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
      this.setState({
        datas: [responseData],
      })
    })
    .catch( error => {
      console.log("Error: ", error)
    })
  }

  render() {
    return (
      <React.Fragment>

        <h1>Hello World, I'm Ghostpost!</h1>
        <h3>powered by React!</h3>
        <div>Requests sent to: {API_HOST}</div>
        <h3>Ordered by Post-Date:</h3>

        <section className="all">
          <p>
            <button onClick={this.getAllBoastsHandler
            }>{!this.state.switchA ? "Expand All Posts" : "Collapse All Posts"}</button>
          </p>

            {this.state.switchA ?
              this.state.datas.map( data_obj => 

                Object.keys(data_obj).map( function(key){

                  let value = data_obj[key]

                  return (
                      <ul key={value.id}>title: {value.title}
                        <li>id: {value.id}</li>
                        <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                        <li>Content: {value.content}</li>
                        <li>Upvotes: {value.upvotes}</li>
                        <li>Downvotes: {value.downvotes}</li>
                        <li>Post-Date: {value.post_date}</li>
                      </ul>
                    )
                  }
                )
              )
              : 
              <div>
                Nothing here. Click Button!
              </div>
            }

        </section>

        <section className="boasts">

            {this.state.switchB ?

                <button onClick={this.boastOnlyButton}>
                  for BOASTS :^D
                </button>
                :
                <div>
                  <button onClick={this.boastOnlyButton}>
                    clear BOASTS :^D
                  </button>
                  <h3>Boasts</h3>
                  {
                    this.state.datas.map(outer =>
                        outer.filter(inner => inner.boolean === true ).map(value =>

                              <ul key={value.id}>title: {value.title}
                                <li>id: {value.id}</li>
                                <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                                <li>Content: {value.content}</li>
                                <li>Upvotes: {value.upvotes}</li>
                                <li>Downvotes: {value.downvotes}</li>
                                <li>Post-Date: {value.post_date}</li>
                              </ul>
                          )
                      )
                  }
                </div>
            }
      </section>

      <section className="roasts">
          {this.state.switchR ?
          <div>
            <button onClick={this.roastsOnlyButton}>
              clear ROASTS :^(
            </button>
            <h3>Roasts</h3>
            {
              this.state.datas.map(outer =>
                outer.filter(inner => inner.boolean === false).map(value =>
                  <ul key={value.id}>title: {value.title}
                    <li>id: {value.id}</li>
                    <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                    <li>Content: {value.content}</li>
                    <li>Upvotes: {value.upvotes}</li>
                    <li>Downvotes: {value.downvotes}</li>
                    <li>Post-Date: {value.post_date}</li>
                  </ul>
                  )
                )
            }

          </div>
            :
          <button onClick={this.roastsOnlyButton}>
            for ROASTS :^(
          </button>
          }
      </section>
      <Roasts/>

      </React.Fragment>
    )
  }
}

class Roasts extends Component {
  render() {
    return (
      <section>
        Happy
      </section>
    )
  }
}

export default App;
