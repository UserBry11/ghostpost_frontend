import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

const API_HOST = 'http://localhost:8000/api/';

class Home extends Component {
  state = {
    datas: [],
    popularData: [],
    switchA: false,
    switchB: true,
    switchR: false,
    switchP: !true,
    id_value: '',
    // now: new Date()
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

    // fetch( API_HOST + 'boastroast/')
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

  getPopularItems = () => {
  
    fetch( API_HOST + 'boastroast/popular/')
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
      this.setState({
        popularData: responseData,
      })
    })
    .catch(error => console.log("Error: ", error))
    
  }

  handleUpvote = id => () => {
    this.getPopularItems()

    fetch(API_HOST + 'boastroast/upvote/?id=' + String(id))
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
      this.setState({ datas: responseData})
    })
    .catch(error => console.log(error))

    this.getPopularItems()
  }

  handleDownvote = id => () => {
    this.getPopularItems()

    fetch(API_HOST + 'boastroast/downvote/?id=' + String(id))
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
      this.setState({ datas: responseData})
      }  
    )
    .catch( error => console.log(error))

    this.getPopularItems()
  }

  componentDidMount(){ 
    fetch( API_HOST + 'boastroast/')
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

    this.getPopularItems()
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

              <Link to="/post" className="post">
                <button className="btn btn-info btn-lg shadow">
                  Create Post
                </button>
              </Link>
            </div>

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
            
            <section className="all col-sm text-center">
                {this.state.switchA ?
                  <div>
                    <button onClick={this.allItemsButton}>
                      all Posts!!
                    </button>
                    <h3>Click to Expand!</h3>
                  </div>
                  :
                  <div className="shadow">
                    {/* <button onClick={this.allItemsButton}>
                      clear All items
                    </button> */}
                    <h3>All items</h3>
                    {
                      this.state.datas.map(value =>
                      <p className="card">
                          <div className="card-header bg-dark text-white"><strong>title: </strong>{value.title}</div>
                          <ul key={value.id} className="list-group shadow">
                            <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                            <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                            <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                            <li className="list-group-item list-group-item-danger">
                              <button onClick={this.handleUpvote(value.id)} className="btn btn-primary shadow">Upvote</button>
                              <button onClick={this.handleDownvote(value.id)} className="btn btn-danger shadow">Downvote</button>
                            </li>
                            <li className="list-group-item list-group-item-primary">Upvotes: {value.upvotes}</li>
                            <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                            <li className="list-group-item list-group-item-info">Post-Date: {value.post_date}</li>
                          </ul> 
                    </p>
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
                    <div className="shadow">
                      <button onClick={this.boastOnlyButton}>
                        clear BOASTS :^D
                      </button>
                      <h3>Boasts</h3>
                      {
                        this.state.datas.filter( condition => condition.boolean === true ).map(value =>
                          <p className="card">
                          <div className="card-header bg-dark text-white"><strong>title: </strong>{value.title}</div>
                          <ul key={value.id} className="list-group shadow">
                            <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                            <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                            <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                            <li className="list-group-item list-group-item-danger">
                              <button onClick={this.handleUpvote(value.id)} className="btn btn-primary shadow">Upvote</button>
                              <button onClick={this.handleDownvote(value.id)} className="btn btn-danger shadow">Downvote</button>
                            </li>
                            <li className="list-group-item list-group-item-primary">Upvotes: {value.upvotes}</li>
                            <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                            <li className="list-group-item list-group-item-success">Post-Date: {value.post_date}</li>
                          </ul> 
                    </p>
                          )
                      }
                    </div>
                }
            </section>

            <section className="roasts col-sm text-center">
                {this.state.switchR ?
                  <div className="shadow">
                    <button onClick={this.roastsOnlyButton}>
                      clear ROASTS :^(
                    </button>
                    <h3>Roasts</h3>
                    {
                      this.state.datas.filter(condition => condition.boolean === false).map(value =>
                        <p className="card">
                        <div className="card-header bg-dark text-white"><strong>title: </strong>{value.title}</div>
                        <ul key={value.id} className="list-group shadow">
                          <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                          <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                          <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                          <li className="list-group-item list-group-item-danger">
                            <button onClick={this.handleUpvote(value.id)} className="btn btn-primary shadow">Upvote</button>
                            <button onClick={this.handleDownvote(value.id)} className="btn btn-danger shadow">Downvote</button>
                          </li>
                          <li className="list-group-item list-group-item-primary">Upvotes: {value.upvotes}</li>
                          <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                          <li className="list-group-item list-group-item-success">Post-Date: {value.post_date}</li>
                        </ul> 
                  </p>
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
              popularItemsButton={this.getPopularItems}
              switchP={this.state.switchP}
              popularData={this.state.popularData}
              handleUpvote={this.handleUpvote}
              handleDownvote={this.handleDownvote}
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
      <section className="popular col-sm text-center">
        {this.props.switchP ?
          <div>
            <button onClick={this.props.popularItemsButton}>for Popular items !!</button>
            <h3>Populate!</h3>
          </div>
          : 
          <div className="shadow">
            {/* <button onClick={this.props.popularItemsButton}>clear Popular items</button> */}
            <h3>Popular feed</h3>
            {
              this.props.popularData.map(value =>
                <p className="card">
                <div className="card-header bg-dark text-white"><strong>title: </strong>{value.title}</div>
                <ul key={value.id} className="list-group shadow">
                  <li className="list-group-item list-group-item-secondary">id: {value.id}</li>
                  <li className="list-group-item list-group-item-primary">{value.boolean ? 'Boast :^D' : 'Roast :^('}</li>
                  <li className="list-group-item list-group-item-secondary">Content: {value.content}</li>
                  {/* <li className="list-group-item list-group-item-danger">
                    <button onClick={this.props.handleUpvote(value.id)} className="btn btn-primary shadow">Upvote</button>
                    <button onClick={this.props.handleDownvote(value.id)} className="btn btn-danger shadow">Downvote</button>
                  </li> */}
                  <li className="list-group-item list-group-item-primary">Upvotes: {value.upvotes}</li>
                  <li className="list-group-item list-group-item-secondary">Downvotes: {value.downvotes}</li>
                  <li className="list-group-item list-group-item-success">Post-Date: {value.post_date}</li>
                </ul> 
          </p>
              )
            }
          </div>
        }
      </section>
    )
  }
}

export default Home;





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