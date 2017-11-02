import React from 'react'
import ACTIONS from '../../actions'
import STORE from '../../store'

const LoginRegister = React.createClass({
	render: function() {
		return(
			<div className="login-register">
				<RegisterForm />
				<LoginForm />
			</div>
		)
	}
})

const RegisterForm = React.createClass({
	_handleSubmit: function(e) {
		e.preventDefault()
		var formEl = e.target,
			userData = {
				name: formEl.userName.value,
				email: formEl.email.value,
				password: formEl.password.value
			}
			ACTIONS.registerUser(userData)
	},
	
	render: function() {
		return(
			<div className="register-form">
				
				<form onSubmit={this._handleSubmit} className="registration-form">
					<input 
						type="text" 
						name="userName" 
						placeholder="create user name" 
					/>
					<input 
						type="text" 
						name="email" 
						placeholder="enter email" 
					/>
					<input 
						type="password" 
						name="password" 
						placeholder="create password" 
					/>
					<button type="submit">register</button>
				</form>
				
				
				
			</div>
		)
	}
})

const LoginForm = React.createClass({
	_handleSubmit: function(e) {
		e.preventDefault()
		ACTIONS.logUserIn(e.target.email.value, e.target.password.value)
		
	},
	
	render: function() {
		return(
			<div className="login-form">
				
				<form onSubmit={this._handleSubmit} className="registration-form">
					<input 
						type="text" 
						name="email" 
						placeholder="enter email" 
					/>
					<input 
						type="password" 
						name="password" 
						placeholder="enter password" 
					/>
					<button type="submit">log-in</button>
				</form>
				
			</div>
		)
	}
})

export default LoginRegister