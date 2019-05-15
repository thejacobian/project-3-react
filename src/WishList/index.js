import React from 'react';
 
class WishList extends React.Component {

	constructor() {
		super()
		this.state = {
			list: []
		}
	}
	async componentDidMount() {
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/askldfjasdfjkl',{
			method: 'GET',
			credentials: 'include'
		})
		const asdf = await data.json()
		
		this.setState({
			list: asdf.wishlist
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
			<h1>
				"heyasdfasdf"
				<ul>
					{wishList}
				</ul>
			</h1>
		)
		
	}
	
}

export default WishList;