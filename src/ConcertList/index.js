import React from 'react';
import { Link }from 'react-router-dom';

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
		const concertList = this.state.list.map((concert) => {
			return(
				<li data-concert-id={concert._id} key={concert._id}>
					<span><strong>{concert.artistName}</strong></span><br/>
					<span>{concert.venue}</span><br/>
					<span>{concert.city}</span><br/>
					<span>{concert.state}</span><br/>
					<span>{concert.date}</span><br/>
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
