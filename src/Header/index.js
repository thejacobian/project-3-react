import React from 'react';
import Home from '../Home'
import { Link }from 'react-router-dom';

const Header = () => {
	return(
		<header>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/user'>Profile</Link></li>
				<li><Link to='/user/search/'>Add an Artist to Bucketlist</Link></li>
				<li><Link to='/concert/search/setlist'>Search for a concert</Link></li>
				<li><Link to='/user/allUsers'>All Users</Link></li>
			</ul>
		</header>
	)
}

export default Header;