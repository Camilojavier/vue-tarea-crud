export const BASE_URL = 'http://localhost:8080';
export const API_VERSION = "/v1";
export const USER_DETAIL_ENDPOINT = '/userDetail';
export const USER_ENDPOINT = "/users"
export const CREATE_ENDPOINT = '/create';
export const EDIT_ENDPOINT = '/edit';
export const ID_PARAM = '/:id';
export const CREATE_QUERY = "?createUser=true"

export const USER_URL = BASE_URL + API_VERSION + USER_DETAIL_ENDPOINT;
export const USER_CREATE = USER_DETAIL_ENDPOINT + CREATE_ENDPOINT;
export const  USER_DELETE = BASE_URL + API_VERSION + USER_ENDPOINT
export const USER_EDIT = USER_DETAIL_ENDPOINT + ID_PARAM + EDIT_ENDPOINT;
export const CREATE_URL = USER_URL + CREATE_QUERY;



