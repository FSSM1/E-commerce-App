import React from 'react';

const Signup = () => {
  return (
    <div className="custom-container">
      {/* Image Section */}
      <div className="custom-image-section"></div>

      {/* Form Section */}
      <div className="custom-form-section">
        <div className="custom-form-container">
          <h2 className="custom-heading">Create an account</h2>
          <form>
            <div>
              <label className="custom-label" htmlFor="name">
                Name
              </label>
              <input
                className="custom-input"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="custom-label" htmlFor="email">
                Email or Phone Number
              </label>
              <input
                className="custom-input"
                id="email"
                type="text"
                placeholder="Email or Phone Number"
              />
            </div>
            <div>
              <label className="custom-label" htmlFor="password">
                Password
              </label>
              <input
                className="custom-input"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <button className="custom-button" type="button">
              Create Account
            </button>
          </form>
          <button className="custom-button custom-google-button" type="button">
            Sign up with Google
          </button>
          <p className="custom-link">
            Already have an account? <a href="#">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;