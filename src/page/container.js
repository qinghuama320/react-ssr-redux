import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Container extends Component {
	render(){
		const { count } = this.props;

	    return (
	      	<div>
	        	<h1>缺省的一级标题{count}</h1>
	        	{this.props.children}
	      	</div>
	    )
  	}
}

/*class Container extends Component {
	render(){
		const { count } = this.props;

	    return (
	      	<div>
	        	<h1>缺省的一级标题{count}</h1>
	        	{this.props.children}
	      	</div>
	    )
  	}
}

function mapStateToProps(state, ownProps) {
    const { count } = state;
    return {
        count
    };
}

export default connect(mapStateToProps)(Container);*/