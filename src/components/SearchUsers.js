import React from "react";
import axios from "axios";

//Here I created an example of a class component, to demonstrate how it is possible to make the App.js file to be even
//shorter by moving a method from it to one of its components. This is the only class component in this project
// (excluding App.js), because I do not have enough time to adjust other components (I have to prepare for the tests).
class SearchUsers extends React.Component {
    state = { searchQuery: "", searchResults: [] };

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ searchQuery: value }, () => {
            if (value.length > 0) {
                axios.get(`http://localhost:8080/search-users?query=${encodeURIComponent(value)}`)
                    .then(response => this.setState({ searchResults: response.data }))
                    .catch(error => console.error("Search error:", error));
            } else {
                this.setState({ searchResults: [] });
            }
        });
    };

    render() {
        return (
            <div className="search-section">
                <h2>Search</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                />
                <div>
                    {this.state.searchResults.map((user, index) => (
                        <div key={index}>
                            {user.username}
                            <button onClick={() => this.props.followUser(user.id)}>Follow</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchUsers;
