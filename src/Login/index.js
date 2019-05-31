import React, { Component } from 'react';
import { Link, Redirect }from 'react-router-dom';

class Login extends Component {
	constructor(){
		super();
		this.handleLogout();
		this.state = {
			username: '',
			password: '',
			redirect: false,
		}
	}
	
	handleLogout = async () => {
		try {
			const logoutResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout', {
		      method: 'POST',
		      credentials: 'include', 
		      body: JSON.stringify(this.state),
		      headers:{
		        'Content-Type': 'application/json'
		    		}
		    	})
        	const parsedResponse = await logoutResponse.json();
        	console.log(parsedResponse);
        	if(parsedResponse.status === 200){
						console.log("logged out", this.state.username);
	    		 //this.props.history.push('/user');
	    		}
	    }   
		 catch (err){
			console.error(err)
		 }
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/login', {
		      method: 'POST',
		      credentials: 'include', 
		      body: JSON.stringify(this.state),
		      headers:{
		        'Content-Type': 'application/json'
		    		}
		    	})
			console.log("logged in as", this.state.username);
        	const parsedResponse = await loginResponse.json();
        	console.log(parsedResponse);
        	if(loginResponse.status === 200){
						this.props.history.push('/user');
						this.setState({ redirect: true });
	    		}
	    }   
		 catch (err){
			console.error(err)
			}
	
	}
	handleClick = async (e) => {
		e.preventDefault();
		try {
			await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout', {
				method: "GET",
				credentials: 'include'
			})
			console.log('logged out');
		} catch (err){
			console.log(err)
		}
	}
	render(){
		const logo = require('../public/BUCKETLIST VERTICAL.png')
		if (this.state.redirect) {
			return <Redirect to='/user'/>;
		}
		
		return (
			<div className="login">
				<img src={logo}/>
				<form className="loginForm" onSubmit={this.handleSubmit}>
					<span>Username:</span>
					<input type="text" name="username" onChange={this.handleChange}/>
					<span>Password:</span>
					<input type="password" name="password" onChange={this.handleChange}/>
					<button type='submit'> Login </button><br/>
					<span>Need to <Link to='/auth/register'>Register?</Link></span>
				</form>
			</div>
			)
	}
}

export default Login;