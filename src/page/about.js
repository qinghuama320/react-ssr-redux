import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fecthAsynAction } from '../redux/action';

class About extends Component {
	static fetchData(option) { // ================编程技巧3================
        if (option && option.store) {
            return option.store.dispatch(fecthAsynAction());
        }
	}

	componentWillMount() {
		// 直接从浏览器输入地址，走服务端渲染方式。================编程技巧2================
		// 1、服务端在renderString之前已取到数据，但willMount会执行；!__NODE__表示是客户端
		// 2、服务端返回数据后，客户端实例化React也会执行willMount，此时也是无必要请求
		//
		// 从前端操作进入页面时，不走服务器渲染，此时由组件自己发出请求
		let needFetch = () => {
			let { fetchAt } = this.props;
			if (fetchAt && (Date.now() - fetchAt) < 3000) {
				return false
			}

			return true;
		}

		!__NODE__ && needFetch() && this.props.onFetchClick(); 
		console.log('about componentWillMount', Date.now());
	}

	componentDidMount() {
		// needFetch() && this.props.onFetchClick(); // 不加!__NODE__仍然安全，因为服务端没有这个生命周期。================编程技巧1================
		console.log('about componentDidMount', Date.now());
	}

	componentDidUpdate() {
		console.log('about componentDidUpdate', Date.now());
	}
	render() {
		const { loading, payload, errmsg, onFetchClick} = this.props;
		console.log('about render, loading = ', loading);
		return (
			<div>
				<h2>我是about页</h2>
				<p>{loading ? '正在加载中' : JSON.stringify(payload) || errmsg}</p>
				<Link to='/'>
				    点我回home页
				</Link> 
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
    const { loading, payload, errmsg, fetchAt } = state;
    return {
        loading, payload, errmsg, fetchAt
    };
}

function mapDispatchToProps(dispatch) {
	return {
		onFetchClick: () => dispatch(fecthAsynAction())
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
