import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class Home extends Component{
	render(){
		// const logo = require('../public/Artboard 1@3x.png')
		return(
			<div className="home">
				<h1>Music Bucketlist</h1>
				<p>Log in to add concerts you have attended to your profile and start your Bucketlist of artists you hope to see</p>
				<span><Link to='/auth/login'>Login</Link></span>
				<span><Link to='/auth/register'>Register</Link></span>
			</div>
		)
	}
}

export default Home;