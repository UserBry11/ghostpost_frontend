import React, { Component } from 'react';
import './App.css';

const API_HOST = 'http://localhost:8000/api/';

class App extends Component {
  state = {
    datas: [],
    switchA: false,
    switch2: true,
    switchB: true,
  }

  boastOnlyButton = () => {
    let result = this.state.switchB
    this.setState({ switchB: !result })
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

        <section class="all">
          <p>
            <button onClick={this.getAllBoastsHandler
            }>{!this.state.switchA ? "Expand All Posts" : "Collapse All Posts"}</button>
          </p>

          <h3>Ordered by Post-Date:</h3>
          <p>
            {this.state.switchA ?
              this.state.datas.map( data_obj => 

                Object.keys(data_obj).map( function(key){

                  let value = data_obj[key]

                  return (
                    <div key={value.id}>title: {value.title}
                      <ul>
                        <li>id: {value.id}</li>
                        <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                        <li>Content: {value.content}</li>
                        <li>Upvotes: {value.upvotes}</li>
                        <li>Downvotes: {value.downvotes}</li>
                        <li>Post-Date: {value.post_date}</li>
                      </ul>
                    </div>
                    )
                  }
                )
              )
              : 
              <div>
                Nothing here. Click Button!
              </div>
            }
          </p>

        </section>

        <section class="boasts">

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

                            <div key={value.id}>title: {value.title}
                              <ul>
                                <li>id: {value.id}</li>
                                <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                                <li>Content: {value.content}</li>
                                <li>Upvotes: {value.upvotes}</li>
                                <li>Downvotes: {value.downvotes}</li>
                                <li>Post-Date: {value.post_date}</li>
                              </ul>
                            </div>
                          )
                      )
                  }
                </div>
            }
      </section>

      </React.Fragment>
    )
  }
}

class Boasts extends Component {
  render() {
    return (
      <section>
          {
            // this.props.next.filter(each => each.boolean === true ).map( todo => <div>
            //   {todo.post_date}
            //   nooo
            // </div>
            //   )
          }

      </section>
    )
  }
}

export default App;
