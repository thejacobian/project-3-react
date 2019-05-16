import React from 'react';
 
class WishList extends React.Component {

	constructor() {
		super()
		this.state = {
			list: [],
			wishId: null
		}
	}
	async componentDidMount() {
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/profile',{
			method: 'GET',
			credentials: 'include'
		})
		const fetchedData = await data.json()
		
		this.setState({
			list: fetchedData.wishlist
		});
		
	}
	handleClick = async (e) => {
		e.preventDefault();
		console.log(e.currentTarget.parentNode.dataset); /// this is the id

		try {
			const deletedWish = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + e.currentTarget.parentNode.dataset.wishId, {
				method: "DELETE",
				credentials: 'include'
			})
			this.componentDidMount()
		} catch (err){
			console.error(err)
		}
	}
	render() {

		const wishList = this.state.list.map((wish, i) => {
			return (
				<li data-wish-id={wish._id} key={wish._id}>
					<span><strong>{wish.artistName}</strong></span><br/>
					<button onClick={this.handleClick}>Delete</button>
				</li>
			)
		})
		
		return (
			<div>
				<h1>Bucketlist Artists</h1>
				<ul>
					{wishList}
				</ul>
			</div>
		)
		
	}
	
}

export default WishList;