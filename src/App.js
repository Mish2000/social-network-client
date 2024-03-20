import React from "react";
import './App.css';
import axios from "axios";
import NoteList from './components/NoteList';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserProfile from './components/UserProfile';
import SearchUsers from "./components/SearchUsers";
import FollowedUsersList from "./components/FollowedUsersList";
import Feed from "./components/Feed";
import CreateNote from "./components/CreateNote";

class App extends React.Component {
    state = {
        username: "",
        password: "",
        token: "",
        notes: [],
        newNote: "",
        signupUsername: "",
        signupPassword: "",
        signupRepeat: "",
        usernameAvailable: true,
        checkingUsername: false,
        signUpSuccessMessage: '',
        signUpErrorMessage: '',
        loginSuccessMessage: '',
        loginErrorMessage: '',
        userId: null,
        followedUsers: [],
    };


    getAllUsers = () => {
        axios.get("http://localhost:8080/get-all-users")
            .then(response => {
                console.log(response.data);
                this.setState({
                    users: response.data || []
                });
            })
            .catch(error => console.error("There was an error fetching the users:", error));
    };


    signIn = () => {
        axios.get(`http://localhost:8080/sign-in?username=${this.state.username}&password=${this.state.password}`)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        token: response.data.token,
                        userId: response.data.userId,
                        loginSuccessMessage: 'Login successful!',
                        loginErrorMessage: ''
                    }, () => {
                        this.getNotes();
                        this.getFollowing();
                        this.getFeedNotes();
                    });
                } else {
                    this.setState({
                        loginErrorMessage: 'Login failed. Please check your username and password.',
                        loginSuccessMessage: ''
                    });
                }
            }).catch(error => {
            this.setState({
                loginErrorMessage: 'An error occurred during login. Please try again.',
                loginSuccessMessage: ''
            });
        });
    };


    getNotes = () => {
        axios.get(`http://localhost:8080/get-notes?token=${this.state.token}`)
            .then(response => {
                console.log("Notes data received:", response.data);
                if (Array.isArray(response.data) && response.data.every(note => note.content && note.username)) {
                    this.setState({notes: response.data}, () => console.log(this.state.notes));
                } else {
                    console.error('Unexpected response format for notes:', response.data);
                    this.setState({notes: []});
                }
            })
            .catch(error => {
                console.error("There was an error fetching the notes:", error);
                this.setState({notes: []});
            });
    };


    saveNote = () => {
        if (!this.state.newNote.trim()) return;

        axios.get(`http://localhost:8080/save-new-note?content=${this.state.newNote}&token=${this.state.token}`)
            .then(() => {
                this.setState(prevState => ({
                    notes: [...prevState.notes, {content: this.state.newNote}],
                    newNote: ""
                }));
            });
    };

    removeNote = (id) => {
        axios.get(`http://localhost:8080/remove-note?token=${this.state.token}&noteId=${id}`)
            .then(() => {
                this.getNotes();
            });
    };

    signUp = () => {
        if (this.state.signupPassword !== this.state.signupRepeat) {
            alert("Passwords do not match.");
            return;
        }

        const signUpUrl = `http://localhost:8080/register?username=${encodeURIComponent(this.state.signupUsername)}&password=${encodeURIComponent(this.state.signupPassword)}&repeat=${encodeURIComponent(this.state.signupRepeat)}`;

        axios.get(signUpUrl)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        signUpSuccessMessage: 'User created successfully!',
                        signUpErrorMessage: '',
                        signupUsername: '',
                        signupPassword: '',
                        signupRepeat: ''
                    });
                    this.getAllUsers();
                } else {
                    this.setState({
                        signUpErrorMessage: 'Registration failed. Please try a different username.',
                        signUpSuccessMessage: ''
                    });
                }
            }).catch(error => {
            this.setState({
                signUpErrorMessage: 'An error occurred during sign up. Please try again.',
                signUpSuccessMessage: ''
            });
        });
    };

    onSignupUsernameChange = (event) => {
        const value = event.target.value;
        this.setState({signupUsername: value}, () => {
            axios.get(`http://localhost:8080/username-available?username=${this.state.signupUsername}`)
                .then(response => {
                    this.setState({
                        usernameAvailable: response.data.available
                    });
                });
        });
    };

    onValueChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        });
    };

    followUser = (followedId) => {
        const {userId} = this.state;

        if (!userId) {
            console.error("The user ID is undefined.");
            return;
        }

        axios.get(`http://localhost:8080/follow`, {
            params: {
                followerId: userId,
                followedId: followedId,
            }
        })
            .then(response => {
                console.log("Follow successful", response.data);
                this.getFollowing();
            })
            .catch(error => {
                console.error("Error following user:", error.response || error);
            });
    };

    getFollowing = () => {
        const {userId} = this.state;
        axios.get(`http://localhost:8080/get-following`, {params: {userId}})
            .then(response => {
                this.setState({followedUsers: response.data}, () => {
                    this.getFeedNotes();
                });
            })
            .catch(error => console.error("Error fetching followed users:", error));
    };

    unfollowUser = (followedId) => {
        const {userId} = this.state;

        if (!userId) {
            console.error("The user ID is undefined.");
            return;
        }

        axios.get(`http://localhost:8080/unfollow`, {
            params: {
                followerId: userId,
                followedId: followedId,
            }
        })
            .then(() => {
                this.getFollowing();
            })
            .catch(error => {
                console.error("Error unfollowing user:", error);
            });
    };

    getFeedNotes = () => {
        axios.get(`http://localhost:8080/get-feed-notes`, {
            params: {userId: this.state.userId}
        })
            .then(response => {
                this.setState({feedNotes: response.data}, () => console.log(this.state.feedNotes));

            })
            .catch(error => console.error("Error fetching feed notes:", error));
    };

    signOut = () => {
        this.setState({
            username: "",
            password: "",
            token: "",
            notes: [],
            newNote: "",
            signupUsername: "",
            signupPassword: "",
            signupRepeat: "",
            usernameAvailable: true,
            checkingUsername: false,
            signUpSuccessMessage: '',
            signUpErrorMessage: '',
            loginSuccessMessage: '',
            loginErrorMessage: '',
            userId: null,
            followedUsers: [],
            feedNotes: [],
        });
    };


    render() {
        const {
            username,
            password,
            token,
            notes,
            signupUsername,
            signupPassword,
            signupRepeat,
            usernameAvailable,
            loginSuccessMessage,
            loginErrorMessage,
            signUpSuccessMessage,
            signUpErrorMessage,
            profilePicUrl,
            profilePicInput,
            followedUsers,
        } = this.state;

        return (
            <div className="App">
                {token ? (
                    <>
                        <button onClick={this.signOut} className="sign-out-btn">Sign Out</button>

                        <UserProfile
                            username={username}
                            profilePicUrl={profilePicUrl}
                            profilePicInput={profilePicInput}
                            onProfilePicChange={(e) => this.setState({profilePicInput: e.target.value})}
                            onSetProfilePic={() => this.setState({profilePicUrl: profilePicInput})}
                        />
                        <SearchUsers followUser={this.followUser}/>
                        <NoteList
                            notes={notes}
                            removeNote={this.removeNote}
                        />
                        <CreateNote
                            newNote={this.state.newNote}
                            onValueChange={(e) => this.onValueChange('newNote', e)}
                            saveNote={this.saveNote}
                        />
                        <Feed feedNotes={this.state.feedNotes}/>
                        <FollowedUsersList followedUsers={followedUsers} unfollowUser={this.unfollowUser}/>
                    </>
                ) : (
                    <>
                        <LoginForm
                            username={username}
                            password={password}
                            onValueChange={this.onValueChange}
                            signIn={this.signIn}
                            loginSuccessMessage={loginSuccessMessage}
                            loginErrorMessage={loginErrorMessage}
                        />
                        <SignUpForm
                            signupUsername={signupUsername}
                            signupPassword={signupPassword}
                            signupRepeat={signupRepeat}
                            usernameAvailable={usernameAvailable}
                            onSignupUsernameChange={this.onSignupUsernameChange}
                            onValueChange={this.onValueChange}
                            signUp={this.signUp}
                            passwordsMatch={signupPassword === signupRepeat}
                            signUpSuccessMessage={signUpSuccessMessage}
                            signUpErrorMessage={signUpErrorMessage}
                        />
                    </>
                )}
            </div>
        );
    }

}

export default App;

