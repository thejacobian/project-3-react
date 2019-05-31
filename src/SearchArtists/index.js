import React, { Component } from 'react';
import Header from '../Header'
import { Redirect }from 'react-router-dom';

class SearchArtists extends Component {
	constructor(){
		super();
		this.state = {
			searchParam: '',
			searchResults: null,
			redirect: false
		}

	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		console.log("handleSubmit hit on SearchArtists page");
		const newSearchParam = this.state.searchParam.replace((/" "/g, "%20"))
		const apiCall = `https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/search/artists?artistName=${newSearchParam}&p=1&sort=sortName`;
		try {
			const response = await fetch(apiCall, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'X-API-key': process.env.REACT_APP_SETLISTFM_API_KEY
				}
			})
			const artists = await response.json()
			this.setState({
				searchResults: artists.artist
			})
			console.log(artists);
		} catch (err){
			console.log(err);
		}
	}
	// this adds artist to bucket list
	handleClick = async (id, e) => {
		e.preventDefault();
		console.log('Bucketlist id: ', id);
		const selectedArtist = this.state.searchResults.filter((artist) => {
			return artist.mbid === id;
		})[0];
		console.log(selectedArtist);
		const apiArtist = {};
		apiArtist.artistName = selectedArtist.name;
		apiArtist.artistId = selectedArtist.mbid;
		console.log(apiArtist);
		const backendCall = `${process.env.REACT_APP_BACKEND_URL}/wish`
		try {
			const addedArtist = await fetch(backendCall, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(apiArtist),
				headers: {
					'Content-Type': 'application/json',
				}
			})
			const parsedResponse = await addedArtist.json();
			console.log(parsedResponse);
			this.setState({
				searchParam: '',
				searchResults: null,
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

		let artistList = null;
		if(this.state.searchResults){
			artistList = this.state.searchResults.map((element, i) => {
				return(
					<li key={i} id={element.mbid} >
						<span><strong>{element.name}</strong></span>
						<button onClick={this.handleClick.bind(null, element.mbid)}>Add to BucketList</button>
					</li>

				)
			})
		}
		return(
			<div className="search">
				<Header />
				<h1>Search Artists for Bucketlist</h1>
				<form className="searchForm" onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.searchParam} name="searchParam" placeholder="Artist Name" onChange={this.handleChange}/>
					<button type="submit">Search</button>
				</form>
				<ul>
					{artistList}
				</ul>
			</div>
		)
	}
}
export default SearchArtists
