import React, { Component } from 'react';
import WishList from '../WishList'
import ConcertList from '../ConcertList'
import Header from '../Header'

class User extends Component {

	render(){
		return(
			<div>
				<Header />
				<div className="profile">
					<ConcertList />
					<WishList />
				</div>
			</div>


			)
	}
}

export default User;