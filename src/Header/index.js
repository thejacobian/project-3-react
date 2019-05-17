import React from 'react';
import Home from '../Home'
import { Link }from 'react-router-dom';

const Header = () => {
	const logo = require('../public/Artboard 1@3x.png')
	return(
		<header>
			<ul>
				<li><img src={logo}/></li>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/user'>Profile</Link></li>
				<li><Link to='/user/search/'>Artists</Link></li>
				<li><Link to='/concert/search/setlist'>Concerts</Link></li>
				<li><Link to='/user/allUsers'>All Users</Link></li>
			</ul>
		</header>
	)
}

export default Header;