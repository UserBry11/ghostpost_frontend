import React, { Component } from 'react';
import './App.css';

const API_HOST = 'http://localhost:8000/api/';

class App extends Component {
  state = {
    datas: [],
    popularData: [],
    switchA: false,
    switchB: true,
    switchR: false,
    switchP: true,
  }

  allItemsButton = () => {

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

  boastOnlyButton = () => {
    let result = this.state.switchB
    this.setState({ switchB: !result })
  }

  roastsOnlyButton = () => {
    let result = this.state.switchR;
    this.setState({ switchR: !result })
  }

  popularItemsButton = () => {
    let result = this.state.switchP
    this.setState({ switchP: !result })

    fetch( API_HOST + 'boastroast/popular/')
    .then(response => response.json())
    .then(responseData => {
      console.log('responseData', responseData)
      this.setState({
          popularData: responseData,
      })
    })
    .catch(error => console.log("Error: ", error))
  }

  postPostButton = () => {
      let data = {
        "title": "Maximum1",
        "boolean": false,
        "content": "Maximum1",
        "upvotes": 1,
        "downvotes": 0,
        "post_date": "2020-02-12T23:06:08Z"
      }

      let meth_head = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      fetch( API_HOST + 'boastroast/', meth_head)
      .then(response => response.json())
      .then(responseData => console.log(responseData))
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
        datas: responseData,
      })
    })
    .catch( error => {
      console.log("Error: ", error)
    })
  }

  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <div className="container">
          <header className="row p-3 mb-2 bg-light shadow rounded text-center">
            <div className="col align-self-end">

              <button className="btn btn-info">Create Post</button>
            </div>
            {/* <PostForm/> */}
            <div className="col">
              <h1>Hello World, I'm Ghostpost!</h1>
              <h3>powered by React & Django!</h3>
              <div><strong>Client-side: </strong>React.js</div>
              <div><strong>Server-side: </strong>Django-Rest-Framework</div>
              <div>Requests sent to: {API_HOST}</div>
            </div>

            <div className="col align-self-end">
              <h4>Developer: Bryan Fernandez</h4>
            </div>
          </header>

          <div className="row p-3 mb-2 bg-light shadow rounded shadow rounded">
            
            <section className="all col-sm">
                {this.state.switchA ?
                  <div>
                    <button onClick={this.allItemsButton}>
                      all Posts!!
                    </button>
                    <h3>Click to Expand!</h3>
                  </div>
                  :
                  <div>
                    <button onClick={this.allItemsButton}>
                      clear All items
                    </button>
                    <h3>All items</h3>
                    {
                      this.state.datas.map(value =>
                          <ul key={value.id} className="list-group"><strong>title: </strong>{value.title}
                            <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                            <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                            <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                            <li className="list-group-item list-group-item-primary">Upvotes: {value.upvotes}</li>
                            <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                            <li className="list-group-item list-group-item-primary">Post-Date: {value.post_date}</li>
                          </ul> 
                        )
                    }
                  </div>
                }
            </section>

            <section className="boasts col-sm text-center">
                {this.state.switchB ?
                    <div>
                      <button onClick={this.boastOnlyButton}>
                        for BOASTS :^D
                      </button>
                      <h3>:^D</h3>
                    </div>
                    :
                    <div>
                      <button onClick={this.boastOnlyButton}>
                        clear BOASTS :^D
                      </button>
                      <h3>Boasts</h3>
                      {
                        this.state.datas.filter( condition => condition.boolean === true ).map(value =>
                          <ul key={value.id} className="list-group"><strong>title: </strong>{value.title}
                            <li className="list-group-item list-group-item-success">id: {value.id}</li>
                            <li className="list-group-item list-group-item-secondary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                            <li className="list-group-item list-group-item-success">Content: {value.content}</li>
                            <li className="list-group-item list-group-item-secondary">Upvotes: {value.upvotes}</li>
                            <li className="list-group-item list-group-item-success">Downvotes: {value.downvotes}</li>
                            <li className="list-group-item list-group-item-success">Post-Date: {value.post_date}</li>
                          </ul> 
                          )
                      }
                    </div>
                }
            </section>

            <section className="roasts col-sm text-center">
                {this.state.switchR ?
                  <div>
                    <button onClick={this.roastsOnlyButton}>
                      clear ROASTS :^(
                    </button>
                    <h3>Roasts</h3>
                    {
                      this.state.datas.filter(condition => condition.boolean === false).map(value =>
                        <ul key={value.id} className="list-group"><strong>title: </strong>{value.title}
                          <li className="list-group-item list-group-item">id: {value.id}</li>
                          <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                          <li className="list-group-item list-group-item">Content: {value.content}</li>
                          <li className="list-group-item list-group-item-info">Upvotes: {value.upvotes}</li>
                          <li className="list-group-item list-group-item">Downvotes: {value.downvotes}</li>
                          <li className="list-group-item list-group-item-danger">Post-Date: {value.post_date}</li>
                      </ul>            
                        )
                    }
                  </div>
                  :
                  <div>
                    <button onClick={this.roastsOnlyButton}>
                      for ROASTS :^(
                    </button>
                    <h3>:^(</h3>
                  </div>
                }
            </section>
        
            <Popular
              popularItemsButton={this.popularItemsButton}
              switchP={this.state.switchP}
              popularData={this.state.popularData}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

class Popular extends Component {
  render() {
    return (
      <section className="popular col-sm text-right">
        {this.props.switchP ?
          <div>
            <button onClick={this.props.popularItemsButton}>for Popular items !!</button>
            <h3>Populate!</h3>
          </div>
          : 
          <div>
            <button onClick={this.props.popularItemsButton}>clear Popular items</button>
            <h3>Popular items</h3>
            <div><strong>from highest-rated 2 lowest</strong></div>
            {
              this.props.popularData.map(value =>
                <ul key={value.id} className="list-group"><strong>title: </strong>{value.title}
                  <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                  <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                  <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                  <li className="list-group-item list-group-item-info">Upvotes: {value.upvotes}</li>
                  <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                  <li className="list-group-item list-group-item-danger">Post-Date: {value.post_date}</li>
              </ul>               
              )

            }
          </div>
        }
      </section>
    )
  }
}


class PostForm extends Component {
    render() {
      return (
        <React.Fragment>
            <h1>Make a Post!</h1>
            <form>
                <label>title: </label>
                <input></input>
                
                <label>Boast? </label>
                <input></input>

                <label>Content: </label>
                <input></input>

                <label>Upvote: </label>
                <input></input>

                <label>Downvote: </label>
                <input></input>

                <button type="submit">Post!</button>


            </form>
        </React.Fragment>
      )
    }
}

export default App;





// this.state.datas.map( data_obj => 

//   Object.keys(data_obj).map( function(key){

//     let value = data_obj[key]

//     return (
//         <ul key={value.id}>title: {value.title}
//           <li>id: {value.id}</li>
//           <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
//           <li>Content: {value.content}</li>
//           <li>Upvotes: {value.upvotes}</li>
//           <li>Downvotes: {value.downvotes}</li>
//           <li>Post-Date: {value.post_date}</li>
//         </ul>
//       )
//     }
//   )
// )

// this.state.datas.map(outer =>
//     outer.filter(inner => inner.boolean === true ).map(value =>

//           <ul key={value.id}>title: {value.title}
//             <li>id: {value.id}</li>
//             <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
//             <li>Content: {value.content}</li>
//             <li>Upvotes: {value.upvotes}</li>
//             <li>Downvotes: {value.downvotes}</li>
//             <li>Post-Date: {value.post_date}</li>
//           </ul>
//       )
//   )

// this.state.datas.map(outer =>
//   outer.filter(inner => inner.boolean === false).map(value =>
//     <ul key={value.id}>title: {value.title}
//       <li>id: {value.id}</li>
//       <li>{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
//       <li>Content: {value.content}</li>
//       <li>Upvotes: {value.upvotes}</li>
//       <li>Downvotes: {value.downvotes}</li>
//       <li>Post-Date: {value.post_date}</li>
//     </ul>
//     )
//   )