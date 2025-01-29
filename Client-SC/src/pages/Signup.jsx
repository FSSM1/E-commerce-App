import React, { useState } from 'react';

const Signup = () => {
  const [role, setRole] = useState('Client'); 

  console.log(role,'roole')

  return (
    <div className="custom-container">
      <div className="custom-image-section"></div>

      <div className="custom-form-section">
        <div className="custom-form-container">
          <h2 className="custom-heading">Create an account</h2>
          <form>

            <div className="custom-role-container">
              <label className="custom-role-label">Role</label>
              <div className="custom-role-options">
                <div
                  className={`custom-role-option ${
                    role === 'Client' ? 'selected' : ''
                  }`}
                  onClick={() => setRole('Client')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="Client"
                    checked={role === 'Client'}
                    onChange={() => {}}
                  />
                  <span>Client</span>
                </div>
                <div
                  className={`custom-role-option ${
                    role === 'Seller' ? 'selected' : ''
                  }`}
                  onClick={() => setRole('Seller')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="Seller"
                    checked={role === 'Seller'}
                    onChange={() => {}}
                  />
                  <span>Seller</span>
                </div>
              </div>
            </div>

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
                Email
              </label>
              <input
                className="custom-input"
                id="email"
                type="text"
                placeholder="Email"
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

            {/* Create Account Button */}
            <button className="custom-button" type="button">
              Create Account
            </button>
          </form>

          {/* Sign up with Google Button */}
          <button className="custom-button custom-google-button" type="button">
            Sign up with Google
          </button>

          {/* Log in Link */}
          <p className="custom-link">
            Already have an account? <a href="#">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;