import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';

import classNames from 'classnames';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Input from 'material-ui/svg-icons/action/fingerprint';
import Output from 'material-ui/svg-icons/content/add-circle-outline';
import Reset from 'material-ui/svg-icons/action/autorenew';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 'login',
			username: '',
			password: '',
			confirmPassword: '',
			tippingFedora: false,
			fedoraMessage: null,
			error: null
		}
	}

	componentWillMount() {
		if(Meteor.userId()) {
			browserHistory.push('/fatty');
		}
	}

	render() {
		return (
		<section id="login">
			<div className="container">
				<Card className="login-card">
					<Tabs value={this.state.login} onChange={
						(value) => { 
							this.handleChange('login', value); 
							this.setState({error: null})
						} 
					}>
						<Tab label="Login" value='login'>
						</Tab>
						<Tab label="Register" value='register'>
						</Tab>
					</Tabs>
					<CardMedia
						overlay={<CardTitle 
							title="Fattest Loser" 
							subtitle={
								this.state.fedoraMessage ? 
								this.state.fedoraMessage 
								: 'It\'s the biggest loser but more real.'} />}
						style={{textAlign: 'center'}}
					>
						<div className="card-media-content">
							<div className="card-media-container">
								{this.state.tippingFedora ? 
									<div>
										<h1>TIPPING INTENSIFIES</h1>
										<img src="https://media.giphy.com/media/10HKnKjoFEsO0U/giphy.gif" />
									</div> 
								: null}
								<ReactCSSTransitionGroup  
									transitionName="confirm-password" 
									transitionEnterTimeout={300} 
									transitionLeaveTimeout={300}>
									{this.state.error !== null ? <p className="error-msg">{this.state.error}</p> : null}
								</ReactCSSTransitionGroup>
								{!this.state.tippingFedora ? <form 
									onSubmit={this.handleLoginProcess.bind(this)} >
									<TextField
									  	value={this.state.username}
									  	onChange={this.handleChange.bind(this, 'username')}
										hintText="Enter Username..."
										floatingLabelText="Username"
										floatingLabelStyle={{color: 'rgba(207, 216, 220, .65)'}}
										hintStyle={{color: 'rgba(207, 216, 220, .65)'}}
										inputStyle={{color: '#CFD8DC'}}
									/>
									<TextField
									  	value={this.state.password}
									  	onChange={this.handleChange.bind(this, 'password')}
										hintText="Enter Password..."
										floatingLabelText="Password"
										type='password'
										floatingLabelStyle={{color: 'rgba(207, 216, 220, .65)'}}
										hintStyle={{color: 'rgba(207, 216, 220, .65)'}}
										inputStyle={{color: '#CFD8DC'}}
									/>
									<ReactCSSTransitionGroup  
										transitionName="confirm-password" 
										transitionEnterTimeout={300} 
										transitionLeaveTimeout={300}>
										{this.state.login === 'register' ? 
											<div className='animate-wrapper'>
												<TextField
									  				value={this.state.confirmPassword}
									  				onChange={this.handleChange.bind(this, 'confirmPassword')}
													hintText="Enter Confirm Password..."
													floatingLabelText="Confirm Password"
													type='password'
													floatingLabelStyle={{color: 'rgba(207, 216, 220, .65)'}}
													hintStyle={{color: 'rgba(207, 216, 220, .65)'}}
													inputStyle={{color: '#CFD8DC'}}
												/>
											</div> 
										: null}
									</ReactCSSTransitionGroup>
								</form>
								: null}
							</div>
						</div>
					  <img src="http://i.imgur.com/CrILrEh.jpg" />
					</CardMedia>
					<CardActions className="card-actions">
						<RaisedButton 
							disabled={this.state.tippingFedora}
						    labelPosition="before"
							icon={this.state.login === 'login' ? <Input /> : <Output />} 
							onClick={this.handleLoginProcess.bind(this)} 
							primary={this.state.login === 'login'} 
							secondary={this.state.login === 'register'} 
							label={this.state.login === 'register' ? 'Register' : 'Login'} />
						<FlatButton 
							disabled={this.state.tippingFedora}
							style={{position: 'absolute'}}
						    labelPosition="before"
							icon={<Reset />} 
							onClick={this.resetLogin.bind(this)} 
							primary={this.state.login === 'register'} 
							secondary={this.state.login === 'login'} />
					</CardActions>
				</Card>
			</div>
		</section>
		);
	}

	resetLogin() {
		this.setState({
			username: '',
			password: '',
			confirmPassword: '',
			error: ''
		});
	}

	handleChange(property, value) {
		if(typeof value === 'object') {
			value = value.target.value;
		}
		let obj = {};
		obj[property] = value;
		this.setState(obj);
	}

	setError(error) {
		this.setState({error});
	}

	handleLoginProcess() {
		const { login, username, password, confirmPassword } = this.state;

		let options = {
			username,
			password
		};

		if(password === confirmPassword || login === 'login') {
			if(login === 'register') {
				Accounts.createUser(options, (er) => {
					if(er) {
						this.setError(er.reason);
					} else {

						this.resetLogin();
						this.tippingFedora();
						setTimeout(() => {
							browserHistory.push('/fatty');
						}, 5000);
					}
				});
			} else {
				Meteor.loginWithPassword(username, password, (er) => {
					if(er) {
						this.setError(er.reason);
						console.log(er);
					} else {
						this.resetLogin();
						this.tippingFedora();

						setTimeout(() => {
							browserHistory.push('/fatty');
						}, 5000);
					}
				});
			}
		} else {
			this.setError('Passwords don\'t match.');
		}
	}

	tippingFedora() {
		let card = $('.login-card');
		className="shake-constant shake-horizontal"
		if(this.state.tippingFedora) {
			this.setState({tippingFedora: false, fedoraMessage: null});
			card.removeClass('shake-constant shake-horizontal');
		} else {
			this.setState({tippingFedora: true, fedoraMessage: 'YOU FAT FUCK.'});
			card.addClass('shake-constant shake-horizontal');
		}
	}
}

export default Register;
