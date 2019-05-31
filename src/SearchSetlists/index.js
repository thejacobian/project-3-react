import React, { Component } from 'react';
import Header from '../Header'
import { Redirect }from 'react-router-dom';

class SearchSetlists extends Component {
	constructor(){
		super();
		this.state = {
			searchArtist: '',
			searchCity: '',
			searchYear: '',
			searchResults: null,
			redirect: false,
		}

	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		console.log("handleSubmit hit on SearchSetlists page");
		// const newSearchArtist = this.state.searchArtist.replace((/" "/g, "%20"))
		// const newSearchCity = '&cityName=' + this.state.searchCity.replace((/" "/g, "%20"))
		// const newSearchYear = '&year=' + this.state.searchYear.replace((/" "/g, "%20"))
		// const apiCall = `${process.env.REACT_APP_BACKEND_URL}/concert/search/setlist/${newSearchArtist}${newSearchCity}${newSearchYear}`
		const apiCall = 'https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/setlists?artistName='
		+ this.state.searchArtist.replace(/ /g, "%20")
		+ '&cityName=' + this.state.searchCity.replace(/" "/g, "%20")
		+ '&year=' + this.state.searchYear.replace((/" "/g, "%20"));
		console.log(apiCall);
		try {
			const response = await fetch(apiCall, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'X-API-key': process.env.REACT_APP_SETLISTFM_API_KEY
				}
			})
			console.log("raw response: ", response);
			const setlists = await response.json()
			console.log("here's the response from the API call");
			console.log(setlists);
			this.setState({
				searchResults: setlists.setlist
			})
			console.log(this.state);
		} catch (err){
			console.log(err);
		}
	}
	handleClick = async (id, e) => {
		e.preventDefault();
		const selectedSetlist = this.state.searchResults.filter((setlist) => {
			return setlist.id === id;
		})[0];
		console.log(selectedSetlist);
		const apiSetlist = {};
		apiSetlist.artistName = selectedSetlist.artist.name;
		apiSetlist.setlistId = selectedSetlist.id;
		apiSetlist.venue = selectedSetlist.venue.name;
		apiSetlist.city = selectedSetlist.venue.city.name;
		apiSetlist.state = selectedSetlist.venue.city.state;
		apiSetlist.date = selectedSetlist.eventDate;
		let setlistStr = "";
		let songNum = 0;
		console.log(selectedSetlist.sets, "selectedSetList.sets");
		// for(let set in selectedSetlist.sets.set) {
		for (let i = 0; i < selectedSetlist.sets.set.length; i++) {
			// console.log(`SetNum: ${songNum}\r\n`)
			// console.log(selectedSetlist.sets.set[i], "set");
			for (let x = 0; x < selectedSetlist.sets.set[i].song.length; x++) {
				songNum++;
				console.log(`song${songNum}: ${selectedSetlist.sets.set[i].song[x].name}`);
				setlistStr = setlistStr + `${songNum}. ${selectedSetlist.sets.set[i].song[x].name}\r\n`;
				// console.log(`SongNum: ${songNum}. ${set.song[i].name}\r\n`)
				// setlistStr.concat(`${songNum}. ${set.song[i].name}\r\n`);
			}
			// set.foreach((song) => {
			// 	songNum++;
			// 	console.log(`SongNum: ${songNum}. ${song.name}\r\n`)
			// 	setlistStr.concat(`${songNum}. ${song.name}\r\n`);
			// });
		}
		apiSetlist.setlist = setlistStr;
		console.log(apiSetlist);

		console.log('I attended ', id);
		const backendCall = `${process.env.REACT_APP_BACKEND_URL}/concert/`
		try {

			const addedConcert = await fetch(backendCall,{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(apiSetlist),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await addedConcert.json();
			console.log(parsedResponse);
			this.setState({
				searchResults: null,
				searchArtist: '',
				searchCity: '',
				searchYear: '',
				redirect: true
			})

		} catch (err){
			console.log(err)
		}



	}
	render(){
		if (this.state.redirect) {
			return <Redirect to='/user'/>;
		}

		let setlistList = null;
		if(this.state.searchResults){
			setlistList = this.state.searchResults.map( (element, i) => {

				return(
					<li key={i} id={element.id} >
						<span><strong>{element.artist.name}</strong></span><br/>
						<span>{element.venue.name}</span><br/>
						<span>{element.venue.city.name}, </span>
						<span>{element.venue.city.state}</span><br/>
						<span>{element.eventDate}</span><br/>
						<button onClick={this.handleClick.bind(null,element.id)}>I attended</button>
					</li>
				)
				
			})
		}

		return(
			<div className="search">
				<Header/>
				<h1>Search Setlists</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="searchArtist" value={this.state.searchArtist} placeholder="Artist Name" onChange={this.handleChange}/>
					<input type="text" name="searchCity" value={this.state.searchCity} placeholder="City" onChange={this.handleChange}/>
					<input type="text" name="searchYear" value={this.state.searchYear} placeholder="Year" onChange={this.handleChange}/>
					<button type="submit">Search</button>
				</form>
				<ul>
					{setlistList}
				</ul>
			</div>
		)

	}
}

export default SearchSetlists