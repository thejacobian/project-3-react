import React from 'react';
 
class WishList extends React.Component {

	constructor() {
		super()
		this.state = {
			list: []
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
	render() {

		const wishList = this.state.list.map((wish, i) => {
			return (
				<li key={wish._id}>
					<span>{wish.artistName}</span><br/>
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