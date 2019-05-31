import React from 'react';
import { Link, Redirect }from 'react-router-dom';

class ConcertList extends React.Component {

	constructor(){
		super()
		this.state = {
			list: [],
			noConcerts: false
		}
	}
	async componentDidMount(){
		const data = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/profile/concerts', {
			method: 'GET',
			credentials: 'include'
		})
		let fetchedData = [{}];
		try {
			fetchedData = await data.json()
		} catch{
			console.log("no concert data for this user")
		}
		console.log(fetchedData);
		if(!fetchedData[0].artistName){
			this.setState({
				noConcerts: true
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
			const deletedConcert = await fetch(process.env.REACT_APP_BACKEND_URL + '/concert/' + e.currentTarget.parentNode.dataset.concertId, {
				method: "DELETE",
				credentials: 'include'
			})
			this.componentDidMount()
		} catch (err){
			console.error(err)
		}
	}
	render(){
		if (this.state.noConcerts) {
			return(			
			<div className="concertList">
				<h1>Concerts Attended</h1>
				<span><Link to='/concert/search/setlist'>Add Concerts</Link></span>
				<ul>No Concerts Found</ul>
			</div>
			)
		}

		const concertList = this.state.list.map((concert) => {
			return(
				<li data-concert-id={concert.id} key={concert.id}>
					<h2><strong>Artist: {concert.artistName}</strong></h2>
					<span>Attendees: {concert.users.length}</span><br/>
					<span>Venue: {concert.venue}</span><br/>
					<span>City: {concert.city}</span><br/>
					<span>State: {concert.state}</span><br/>
					<span>Date: {concert.date}</span><br/>
					<span>Songs: </span>
					<textarea defaultValue={concert.setlist}/><br/>
					<button onClick={this.handleClick}>Delete</button>
				</li>
				)
		})

		return(
			<div className="concertList">
				<h1>Concerts Attended</h1>
				<span><Link to='/concert/search/setlist'>Add Concerts</Link></span>
				<ul>
					{concertList}
				</ul>
			</div>
			)
	}
}

export default ConcertList;
