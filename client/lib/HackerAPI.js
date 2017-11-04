import axios from 'axios';

const headers = new Headers();
headers.set('Content-Type', 'application/json');

const GET = 'get';
const POST = 'post';

const API_SUFFIX = '/api';

export const setToken = token => {
	headers.set('Authorization', `Bearer ${token}`);
};
