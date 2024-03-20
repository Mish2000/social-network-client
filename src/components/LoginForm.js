import React from 'react';

function LoginForm({ username, password, onValueChange, signIn, loginSuccessMessage, loginErrorMessage }) {
    return (
        <div>
            <h2>Sign In</h2>
            <div className="input-field-container">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={event => onValueChange("username", event)}
                />
            </div>
            <div className="input-field-container">
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={event => onValueChange("password", event)}
                />
            </div>
            <button onClick={signIn}>Sign In</button>
            {loginSuccessMessage && <div className="success-message">{loginSuccessMessage}</div>}
            {loginErrorMessage && <div className="error-message">{loginErrorMessage}</div>}
        </div>
    );
}

export default LoginForm;
