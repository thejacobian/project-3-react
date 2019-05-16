import React, { Component } from 'react';
import WishList from '../WishList'
import ConcertList from '../ConcertList'

class User extends Component {

	render(){
		return(
			<div className="profile">
				<ConcertList />
				<WishList />
			</div>


			)
	}
}

export default User;