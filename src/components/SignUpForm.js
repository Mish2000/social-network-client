import React from 'react';

function SignUpForm({
                        signupUsername, signupPassword, signupRepeat, usernameAvailable,
                        onSignupUsernameChange, onValueChange, signUp, passwordsMatch,
                        signUpSuccessMessage, signUpErrorMessage
                    }) {
    return (
        <div>
            <h2>Sign Up</h2>
            <div className="input-field-container">
                <input
                    placeholder="Username"
                    value={signupUsername}
                    onChange={onSignupUsernameChange}
                    style={{ borderColor: usernameAvailable ? "green" : "red" }}
                />
                {!usernameAvailable && <div className="warning">Username is already taken.</div>}
            </div>
            <div className="input-field-container">
                <input
                    placeholder="Password"
                    type="password"
                    value={signupPassword}
                    onChange={(event) => onValueChange("signupPassword", event)}
                />
            </div>
            <div className="input-field-container">
                <input
                    placeholder="Repeat Password"
                    type="password"
                    value={signupRepeat}
                    onChange={(event) => onValueChange("signupRepeat", event)}
                />
                {!passwordsMatch && <div className="warning">Passwords do not match.</div>}
            </div>
            <button onClick={signUp} disabled={!usernameAvailable || !passwordsMatch}>Sign Up</button>
            {signUpSuccessMessage && <div className="success-message">{signUpSuccessMessage}</div>}
            {signUpErrorMessage && <div className="error-message">{signUpErrorMessage}</div>}
        </div>
    );
}


export default SignUpForm;
