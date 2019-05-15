import React, { Component } from 'react';

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
			const setlists = await response.json()
			this.setState({
				searchResults: true
			})
			console.log(setlists);
		} catch (err){
			console.log(err);
		}
	}
	render(){
		return(
			<div>
				<h1>Search Artists for Bucketlist</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="searchParam" placeholder="Artist Name" onChange={this.handleChange}/>
					<button type="submit">Search</button>
				</form>
			</div>
		)
	}
}
export default SearchArtists
