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
		try {
			const deletedWish = await fetch(process.env.REACT_APP_BACKEND_URL + 'api/v1/user/', {
				method: "DELETE",
				credentials: 'include'
			})
			// const deleteWishJSON = = await 
		} catch (err){
			console.log(err)
		}
	}
	render() {

		const wishList = this.state.list.map((wish, i) => {
			return (
				<li key={wish._id}>
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