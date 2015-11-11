import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

export function requireAuthentication(Component) {
		class AuthenticateComponent extends React.Component {

				constructor(props) {
						super(props);
				}

				componentWillMount() {
						if (!this.props.isAuthenticated) {
								this.props.dispatch(pushState(null, `/login?next=${this.props.location.pathname}`));
						}
				}

				render() {
						return (
							<Component {...this.props} />
						);
				}
		}

		AuthenticateComponent.propTypes = {
			dispatch: React.PropTypes.func.isRequired,
			isAuthenticated: React.PropTypes.bool,
			location: React.PropTypes.object
		};

		const mapStateToProps =
				(state) => ({
						token: state.user.token,
						isAuthenticated: state.user.authenticated
				});

		return connect(mapStateToProps)(AuthenticateComponent);
}
