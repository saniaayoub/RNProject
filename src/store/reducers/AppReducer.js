import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  SAVE_INFO,
  SAVE_INFO_SUCCESS,
  SAVE_INFO_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_INFO,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  IMG_UPLOAD,
  IMG_UPLOAD_SUCCESS,
  IMG_UPLOAD_FAILURE,
  IMG_RET,
  IMG_RET_SUCCESS,
  IMG_RET_FAILURE,
  WEATHER_CHK,
  WEATHER_CHK_SUCCESS,
  WEATHER_CHK_FAILURE,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  SEARCH_SONG,
  SEARCH_SONG_SUCCESS,
  SEARCH_SONG_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOADER_TRUE,
  LOADER_FALSE,
} from '../constants';

const initialState = {
  user: {},
  userInfo: {},
  profileImg: '',
  loader: false,
  posts: [],
  weatherData: {},
  accessToken: '',
  songs: [],
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loader: false,
      };
      break;
    case SIGNIN_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNUP_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case LOGOUT:
      state = {
        ...state,
        loader: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        user: {},
        posts: [],
        userInfo: {},
        weatherData: {},
        loader: false,
      };
      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SEND_EMAIL:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SEND_EMAIL_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SEND_EMAIL_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case ADD_POST:
      state = {
        ...state,
        loader: true,
      };
      break;

    case SAVE_INFO:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SAVE_INFO_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SAVE_INFO_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_POSTS:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_POSTS_SUCCESS:
      state = {
        ...state,
        posts: action.payload,
        loader: false,
      };
      break;
    case GET_POSTS_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case IMG_UPLOAD:
      state = {
        ...state,
        loader: true,
      };
      break;
    case IMG_UPLOAD_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case IMG_UPLOAD_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case IMG_RET:
      state = {
        ...state,
        loader: true,
      };
      break;
    case IMG_RET_SUCCESS:
      state = {
        ...state,
        profileImg: action.payload,
        loader: false,
      };
      break;
    case IMG_RET_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case ADD_POST_SUCCESS:
      // state.posts.unshift(action.payload)
      state = {
        ...state,
        posts: [action.payload, ...state.posts],
        loader: false,
      };
      break;
    case ADD_POST_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case GET_INFO:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_INFO_SUCCESS:
      state = {
        ...state,
        userInfo: action.payload,
        loader: false,
      };
      break;
    case GET_INFO_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case WEATHER_CHK:
      state = {
        ...state,
        loader: true,
      };
      break;
    case WEATHER_CHK_SUCCESS:
      state = {
        ...state,
        weatherData: action.payload,
        loader: false,
      };
      break;
    case WEATHER_CHK_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_TOKEN:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_TOKEN_SUCCESS:
      state = {
        ...state,
        accessToken: action.payload,
        loader: false,
      };
      break;
    case GET_TOKEN_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SEARCH_SONG:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SEARCH_SONG_SUCCESS:
      state = {
        ...state,
        songs: action.payload,
        loader: false,
      };
      break;
    case SEARCH_SONG_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case LOADER_TRUE:
      state = {
        ...state,
        loader: true,
      };
      break;

    case LOADER_FALSE:
      state = {
        ...state,
        loader: false,
      };
      break;

    default:
      break;
  }

  return state;
}
