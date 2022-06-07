import React from "react";
import "./Search.css";
import axios from 'axios';


class SearchBar extends  React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
      results: {},
      loading: false,
      message: '',
		};

	}

  handleOnInputChange = (event) => {
    const query = event.target.value;
  
    if ( ! query ) {
      this.setState({ query, results: {}, message: '' } );
    } else {
      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };


  renderSearchResults = () => {
    const {results} = this.state;
  
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <a key={result.id} href={result.previewURL} className="result-items">
                <h6 className="image-username">{result.user}</h6>
                <div className="image-wrapper">
                  <img className="image" src={result.previewURL} alt={result.user}/>
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  fetchSearchResults = (updatedPageNo = '', query ) => {

    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
    const searchUrl = `https://pixabay.com/api/?key=27870166-2011f913cf27601536804ab28&q=${query}${pageNumber}`;
  
    if (this.cancel) { this.cancel.cancel(); }
    this.cancel = axios.CancelToken.source();
  
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.hits.length
          ? 'There are no more search results. Please try a new search.'
          : '';
  
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results.Please check network',
          });
        }
      });
  };

	render() {
    const { query } = this.state;
		return (
			<div className="container">
				<h2 className="heading-style">React Search Application</h2>
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						defaultValue = ''
						id="search-input"
						placeholder="search"
            onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>
				{ this.renderSearchResults() }
			</div>
			)
	}
}



export default SearchBar;

































