import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class Home extends Component{
	render(){
		const logo = require('../public/BUCKETLIST HHORIZONTAL.png')
		return(
			<div className="home">
				<img src={logo} />
				<span><Link to='/auth/login'>Login</Link></span>
				<span><Link to='/auth/register'>Register</Link></span>
			</div>
		)
	}
}

export default Home;