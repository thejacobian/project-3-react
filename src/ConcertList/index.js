import React from 'react';

class ConcertList extends React.Component {

	constructor(){
		super()
		this.state = {
			list: []
		}
	}
	async componentDidMount(){
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/profile', {
			method: 'GET',
			credentials: 'include'
		})
		const fetchedData = await data.json()
		this.setState({
			list: fetchedData.concerts
		});

	}
	render(){
		const concertList = this.state.list.map((concert) => {
			return(
				<li key={concert._id}>
					<span><strong>{concert.artistName}</strong></span><br/>
					<span>{concert.venue}</span><br/>
					<span>{concert.city}</span><br/>
					<span>{concert.state}</span><br/>
					<span>{concert.date}</span><br/>
				</li>
				)
		})
		return(
			<div>
				<h1>Shows Attended</h1>
				<ul>
					{concertList}
				</ul>
			</div>
			)

	}






}

export default ConcertList;
