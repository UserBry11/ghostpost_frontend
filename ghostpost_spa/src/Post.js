import React, { Component } from "react";
import { Link} from "react-router-dom";

const API_HOST = 'http://localhost:8000/api/';

class Post extends Component {

    state = {
        title: '',
        boolean: true,
        content: '',
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleBooleanChange = () => {
        this.setState({
            boolean: !this.state.boolean
        })
    }

    postPostButton = event => {
        event.preventDefault();

        let meth_head = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state)
        }
        fetch( API_HOST + 'boastroast/', meth_head)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
            this.props.history.push("/")
            }
        )
        .catch(error => { 
            console.log("Error: ", error)
            }
        )
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
            <div className="card">
                <div className="card-header shadow">

                <h1 className="card-title">Make a Post!</h1>
                <Link to="/">
                    <button type="button" className="btn btn-outline-info btn-sm">
                        Back to Home
                    </button>
                </Link>
            </div>

            <div className="card-body shadow">

                <form onSubmit={this.postPostButton}>

                    <div className="form-group row">
                        <label htmlFor="id_title" className="col-sm-2 col-form-label">Title:</label>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control shadow"
                                id="inputEmail3"
                                placeholder="30 chars or less"
                                name="title"
                                maxLength="30"
                                onChange={this.handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Content:</label>
                        <div className="col-auto">
                            <textarea
                                className="form-control shadow"
                                id="inputPassword3 id_content"
                                placeholder="Content"
                                cols="40" 
                                rows="10" 
                                name="content" 
                                onChange={this.handleChange}
                                required 
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2">Boast or Roast:</div>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="form-check-input shadow" 
                                    type="checkbox" 
                                    id="gridCheck1 id_boolean"
                                    name="boolean"
                                    onChange={this.handleBooleanChange}
                                />
                                <label className="form-check-label" htmlFor="gridCheck1">
                                Check to Roast
                                </label>
                                <div>
                                    <small>(Default: Boast)</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="shadow btn btn-primary btn-lg">Post It!</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
      )
    }
}

export default Post;