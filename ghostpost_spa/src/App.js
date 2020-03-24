import React, { Component } from 'react';
import './App.css';

const API_HOST = 'http://localhost:8000/api/';

class App extends Component {
  state = {
    status: [],
    switch: false,
  }

  getAllBoastsHandler = () => {

    let OnOff = this.state.switch
    this.setState({switch: !OnOff})

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
        status: [responseData]
      })
    })
    .catch( error => {
      console.log("Error: ", error)
    })
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

  // hoohandler = () => {
  //   let obj = {
  //     'key1': [{a:1}, {a:2}, {a:3}],
  //     'key2': [{a:4}, {a:5}, {a:6}],
  //     'key3': [{a:7}, {a:8}, {a:9}]
  //  };

  //  let data = {
  //    details: { info: "444" },
  //    casper: {info: "5555"}
  //  };
  //   Object.keys(data).map( function (key) {
  //     let item = data[key]
  //     console.log(item)
  //     console.log(item.info)
  //   })

  // }

  render() {
    return (
      <React.Fragment>

        <h1>Hello World, I'm Ghostpost!</h1>
        <h3>powered by React!</h3>
        <div>Requests sent to: {API_HOST}</div>

        <section class="all">
          <p>
            <button onClick={this.getAllBoastsHandler
            }>{!this.state.switch ? "Expand All Posts" : "Collapse All Posts"}</button>
          </p>

          <h3>Ordered by Post-Date:</h3>
          <div>
            {this.state.switch ?
              this.state.status.map( data_obj => 

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
              : 'Nothing here. Click Button!'
            }
          </div>
        </section>

      </React.Fragment>
    )
  }
}



export default App;
