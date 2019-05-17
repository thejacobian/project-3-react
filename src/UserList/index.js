import React from 'react';
import { Link }from 'react-router-dom';

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
		const fetchedData = await data.json()
		console.log(fetchedData);
		this.setState({
			list: fetchedData.data
		});

	}
	render(){
		const userList = this.state.list.map((user) => {
			return(
				<li key={user._id}>
					<span><strong><Link to={`${user._id}`}>{user.username}</Link></strong></span><br/>
					<span>{user.location}</span>
				</li>
			)
		})
		return(
			<div className="userList">
				<h1>Users</h1>
				<ul>
					{userList}
				</ul>
			</div>
		)
		
	}
	
}

export default UserList;
