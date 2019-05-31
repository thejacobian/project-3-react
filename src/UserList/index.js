import React from 'react';
import { Link }from 'react-router-dom';
import Header from '../Header'

class UserList extends React.Component {
	constructor(){
		super();
		this.state = {
			list: []
		}
	}
	async componentDidMount(){
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user', {
			method: 'GET',
			credentials: 'include'
		})
		let fetchedData = [{}];
		try {
			fetchedData = await data.json()
		} catch{
			console.log("no users")
		}
		console.log(fetchedData);
		this.setState({
			list: fetchedData
		});

	}
	render(){
		const userList = this.state.list.map((user) => {
			return(
				<li key={user.id}>
					<h2><strong><Link to='/user'>{user.username}</Link></strong></h2><br/>
					<span>{user.location}</span>
				</li>
			)
		})
		return(
			<div className="userList">
				<Header />
				<h1>Users</h1>
				<ul className="users">
					{userList}
				</ul>
			</div>
		)
		
	}
	
}

export default UserList;
