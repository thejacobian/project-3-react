import React from 'react';
import { Link }from 'react-router-dom';

const Header = () => {
	return(
		<header>
			<ul>
				<li><Link to='/auth/login'>Login</Link></li>
				<li><Link to='/auth/register'>Register</Link></li>
				<li><Link to='/user/search/'>Add a band to Bucketlist</Link></li>
				<li><Link to='/concert/search/setlist'>Search for a concert</Link></li>
				<li><Link to='/user'>Display User's Bucketlist</Link></li>
			</ul>
		</header>
	)
}

export default Header;