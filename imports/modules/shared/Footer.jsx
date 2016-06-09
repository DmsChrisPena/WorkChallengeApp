import React from 'react';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import LogIcon from 'material-ui/svg-icons/editor/border-color';
import FattyIcon from 'material-ui/svg-icons/action/pregnant-woman';

class Footer extends React.Component {

	render() {
		const styles = {
			fontSize: 10
		};
		return (
			<Tabs className="footer-tab">
				<Tab
					icon={<DashboardIcon />}
					route="/fatty"
					onActive={this.handleActive}
					label="DASHBOARD"
					style={styles}
				/>
				<Tab
					icon={<ChatIcon />}
					route="/chat"
					onActive={this.handleActive}
					label="CHAT"
					style={styles}
				/>
				<Tab
					icon={<LogIcon />}
					route="/log"
					onActive={this.handleActive}
					label="LOG"
					style={styles}
				/>
				<Tab
					icon={<FattyIcon />}
					route="/profile"
					onActive={this.handleActive}
					label="PROFILE"
					style={styles}
				/>
			</Tabs>
		);
	}

	handleActive(tab) {
		browserHistory.push(tab.props.route);
	}
}

export default Footer;