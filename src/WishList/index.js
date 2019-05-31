import React from 'react';
import { Link }from 'react-router-dom';
 
class WishList extends React.Component {

	constructor() {
		super()
		this.state = {
			list: [],
			wishId: null,
			noWishes: false,
		}
	}
	async componentDidMount() {
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/profile/wishes',{
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
		if(!fetchedData[0].artistName){
			this.setState({
				noWishes: true
			});
		} else {
			this.setState({
				list: fetchedData
			});
		}
	}
	handleClick = async (e) => {
		e.preventDefault();
		console.log(e.currentTarget.parentNode.dataset); /// this is the id

		try {
			const deletedWish = await fetch(process.env.REACT_APP_BACKEND_URL + '/wish/' + e.currentTarget.parentNode.dataset.wishId, {
				method: "DELETE",
				credentials: 'include'
			})
			this.componentDidMount()
		} catch (err){
			console.error(err)
		}
	}
	render() {
		if (this.state.noWishes) {
			return (
			<div className="artistList">
				<h1>Bucketlist Artists</h1>
				<span><Link to='/user/search/'>Add Artists</Link></span>
				<ul>No Bucketlist Artists found</ul>
			</div>
			)
		}

		const wishList = this.state.list.map((wish, i) => {
			return (
				<li data-wish-id={wish.id} key={wish.id}>
					<h2><strong>Artist: {wish.artistName}</strong></h2>
					<span>Popularity: {wish.users.length}</span><br/>
					<button onClick={this.handleClick}>Delete</button>
				</li>
			)
		})
		
		return (
			<div className="artistList">
				<h1>Bucketlist Artists</h1>
				<span><Link to='/user/search/'>Add Artists</Link></span>
				<ul>
					{wishList}
				</ul>
			</div>
		)
	}
}

export default WishList;