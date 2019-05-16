import React, { Component } from 'react';

class SearchSetlists extends Component {
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
		console.log("handleSubmit hit on SearchSetlists page");
		const newSearchParam = this.state.searchParam.replace((/" "/g, "%20"))
		const apiCall = `${process.env.REACT_APP_BACKEND_URL}/concert/search/setlist/${newSearchParam}`
		try {
			const response = await fetch(apiCall)

			console.log("raw response: ", response);

			const setlists = await response.json()
			this.setState({
				searchResults: setlists.data
			})
			console.log(this.state);
		} catch (err){
			console.log(err);
		}
	}
	handleClick = async (id, e) => {
		e.preventDefault();
		console.log('I attended ', id);
		const apiCall = `${process.env.REACT_APP_BACKEND_URL}/concert/new/${id}`
		try {

			const addedConcert = await fetch(apiCall,{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(id),
				headers: {
					'Accept': 'application/json'
				}
			})
			const parsedResponse = await addedConcert.json();
			console.log(parsedResponse);

		} catch (err){
			console.log(err)
		}



	}
	render(){

		let setlistList = null;

		if(this.state.searchResults){
			setlistList = this.state.searchResults.map( (element, i) => {

				return(
					<li key={i} id={element.id} >
						<span><strong>{element.artist}</strong></span><br/>
						<span>{element.venue}</span><br/>
						<span>{element.city}, </span>
						<span>{element.state}</span><br/>
						<span>{element.date}</span><br/>
						<button onClick={this.handleClick.bind(null,element.id)}>I attended</button>

					</li>
				)
				
			})
		}

		return(
			<div className="search">
				<h1>Search Setlists</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="searchParam" placeholder="Artist Name" onChange={this.handleChange}/>
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