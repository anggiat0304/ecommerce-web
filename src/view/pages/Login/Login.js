import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import { signIn } from "../../../actions/AuthAction";
import GenericResponse from "../../../dto/GenericResponse";
import { connect } from "react-redux";
import Toast from "../../component/Toast/Toast";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            responseObj: null,
        };
    }

    componentDidUpdate(prevProps) {
        // Check if the auth state has changed
        if (prevProps.auth !== this.props.auth) {
            const { auth } = this.props;
            const responseObj = new GenericResponse(auth.data.message, auth.data.success, auth.data.Data);
            console.log(responseObj);

            // Continue with your logic here
            const data = responseObj.data;
            console.log(data);
            const username = data == null ? "null" : data.username;
            const token = data == null ? "null" : data.type +" " + data.token ;
            const userId = data == null ? "null" : data.id;
            const success = auth.data.success
            console.log(success)
            if (!success) {
                alert(auth.data.message)
            }
            localStorage.setItem('token',token)
            localStorage.setItem('username',username);
            localStorage.setItem('userid',userId);
            
            if(data != null){
                window.location.href = '/';
            }
            
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        // Dispatch the signIn action
        this.props.dispatch(signIn({username, password}));
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center vh-100">
                        <div className="card" style={{ padding: '30px' }}>
                            <h2>Log in to Store Admin </h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <div style={{ marginBottom: '10px' }}></div>
                                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Login);
