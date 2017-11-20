import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addAction, subAction } from '../redux/action';

class Home extends Component {
	componentWillMount() {
		//__NODE__ && this.props.onAddClick();
		console.log('home componentWillMount', Date.now());
	}

	componentDidMount() {
		//this.props.onAddClick();
		console.log('home componentDidMount', Date.now());
	}

	componentDidUpdate() {
		console.log('home componentDidUpdate', Date.now());
	}

	render() {
		const { count, onAddClick, onSubClick} = this.props;
		console.log('home render, count = ', count);
		return (
			<div>
				<h2>我是home页</h2>
				<h2>{count}</h2>
				<button onClick={onAddClick}>Add One</button>
				<button onClick={onSubClick}>Sub One</button>
				<Link to='/about'>
				    点我进about页
				</Link> 
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    const { count } = state;
    return {
        count
    };
}

function mapDispatchToProps(dispatch) {
	return {
		onAddClick: () => dispatch(addAction),
		onSubClick: () => dispatch(subAction)
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);