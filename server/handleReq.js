import http from 'http';
import React from 'react';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import configureStore from '../src/redux/store';
import { fecthAsynAction } from '../src/redux/action';
import routes from '../src/router';

import express from 'express';
import path from 'path';

export const serverRender = express.Router();
const store = configureStore({count: 0, loading: true});

const getReduxPromise = (props, store) => {
    const comp = props.components[props.components.length - 1].WrappedComponent; // 取到匹配路由的组件
    return comp.fetchData ? comp.fetchData({store}) : Promise.resolve(); // 请求数据组件还没有实例化，所以fetchData必须是静态方法
};

serverRender.route('*').get((req, res) => {
    //console.log(req.url);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        try{
			if ('/about' === req.url) {
				getReduxPromise(renderProps, store).then(() => { // 这个方法比下面一句更通用。若没有fetchData就直接返回，所以可以适用所有路由。此时保留，是为了更好理解同步状态和异步状态的差别。
				//store.dispatch(fecthAsynAction()).then(() => {
					let html = renderToString(
						<Provider store = {store}>
							<RouterContext {...renderProps} />
						</Provider>
					);
					let state = JSON.stringify(store.getState());

					res.render('index', { html, state});
				});		
			} else {
				//渲染组件
				let html = renderToString(
					<Provider store = {store}>
						<RouterContext {...renderProps} />
					</Provider>
				);
				let state = JSON.stringify(store.getState());

				res.render('index', { html, state});
			}
			
		}catch(e){
			res.send(500, e.message);
		}
    });
});

export const api = express.Router();
const hostname =  'api.douban.com';
const pathPrefix = '/v2';

api.route('*').all((req, res) => {
	const path = req.originalUrl.replace(/\/api/, '');
	console.log(pathPrefix + path);
	const request = http.request({
		hostname,
		path: pathPrefix + path,
	}, resp => {
		let json = '';
		resp.on('data', (chunk) => {
			json += chunk;
		});
		resp.on('end', () => {
			res.append('Access-Control-Allow-Origin', '*');
			res.send(json);
			//console.log('http get done!', json);
		});
	});

	request.on('error', (e) => {
		console.log(`problem with request of douban api: ${e.message}`);
	});

	request.end();
});