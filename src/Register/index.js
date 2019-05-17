import React, { Component } from 'react';

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			location: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/register', {
		      method: 'POST',
		      credentials: 'include',  // on every request we have to send the cookie
		      body: JSON.stringify(this.state),
		      headers:{
		        'Content-Type': 'application/json'
		    		}
		    	})

        	const parsedResponse = await registerResponse.json();
        	if(parsedResponse.status === 200){
	    		this.props.history.push('../user');
	    	}
	    }   
		 catch (err){
			console.error(err)
			}
	
	}
	render(){
		return (
			<form className="register" onSubmit={this.handleSubmit}>
				<span>Username:</span>
				<input type="text" name="username" onChange={this.handleChange}/>
				<span>Password:</span>
				<input type="password" name="password" onChange={this.handleChange}/>
				<span>Location:</span>
				<input type="text" name="location" onChange={this.handleChange}/>
				<button type='submit'> Register </button>
			</form>
			)
	}
}

export default Register;