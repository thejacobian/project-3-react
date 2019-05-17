import React, { Component } from 'react';
import Header from '../Header'

class SearchArtists extends Component {
	constructor(){
		super();
		this.state = {
			searchParam: '',
			searchResults: null
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
		const apiCall = `${process.env.REACT_APP_BACKEND_URL}/user/search/${newSearchParam}`
		try {
			const response = await fetch(apiCall)
			const artists = await response.json()
			this.setState({
				searchResults: artists.data
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
		const apiCall = `${process.env.REACT_APP_BACKEND_URL}/user/newWish/${id}`
		try {
			const addedArtist = await fetch(apiCall, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(id),
				headers: {
					'Accept': 'application/json'
				}
			})
			const parsedResponse = await addedArtist.json();
			console.log(parsedResponse);
			this.setState({
				searchParam: '',
				searchResults: null
			})
		} catch (err){
			console.log(err)
		}
	}
	render(){

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
				<form clasname="searchForm" onSubmit={this.handleSubmit}>
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
