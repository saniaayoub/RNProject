import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SAVE_INFO,
  SAVE_INFO_SUCCESS,
  SAVE_INFO_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_INFO,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
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
  LOADER_FALSE,
  LOADER_TRUE,
} from '../constants';

export default class AppAction {
  static SignIn(payload) {
    return {
      type: SIGNIN,
      payload,
    };
  }
  static SignInSuccess(payload) {
    return {
      type: SIGNIN_SUCCESS,
      payload,
    };
  }
  static SignInFailure() {
    return {
      type: SIGNIN_FAILURE,
    };
  }
  static SignUp(payload) {
    return {
      type: SIGNUP,
      payload,
    };
  }
  static SignUpSuccess(payload) {
    return {
      type: SIGNUP_SUCCESS,
      payload,
    };
  }
  static SignUpFailure() {
    return {
      type: SIGNUP_FAILURE,
    };
  }

  static SendEmail(payload) {
    return {
      type: SEND_EMAIL,
      payload,
    };
  }
  static SendEmailSuccess() {
    return {
      type: SEND_EMAIL_SUCCESS,
    };
  }
  static SendEmailFailure() {
    return {
      type: SEND_EMAIL_FAILURE,
    };
  }
  static SaveInfo(payload) {
    return {
      type: SAVE_INFO,
      payload,
    };
  }
  static SaveInfoSuccess() {
    return {
      type: SAVE_INFO_SUCCESS,
    };
  }
  static SaveInfoFailure() {
    return {
      type: SAVE_INFO_FAILURE,
    };
  }
  static GetInfo() {
    return {
      type: GET_INFO,
    };
  }
  static GetInfoSuccess(payload) {
    return {
      type: GET_INFO_SUCCESS,
      payload,
    };
  }
  static GetInfoFailure() {
    return {
      type: GET_INFO_FAILURE,
    };
  }
  static ImgUpload(payload) {
    return {
      type: IMG_UPLOAD,
      payload,
    };
  }
  static ImgUploadSuccess() {
    return {
      type: IMG_UPLOAD_SUCCESS,
    };
  }
  static ImgUploadFailure() {
    return {
      type: IMG_UPLOAD_FAILURE,
    };
  }
  static ImgRetrieve() {
    return {
      type: IMG_RET,
    };
  }
  static ImgRetrieveSuccess(payload) {
    return {
      type: IMG_RET_SUCCESS,
      payload,
    };
  }
  static ImgRetrieveFailure() {
    return {
      type: IMG_RET_FAILURE,
    };
  }
  static Logout() {
    return {
      type: LOGOUT,
    };
  }
  static LogoutSuccess() {
    return {
      type: LOGOUT_SUCCESS,
    };
  }
  static LogoutFailure() {
    return {
      type: LOGOUT_FAILURE,
    };
  }

  static AddPost(payload) {
    return {
      type: ADD_POST,
      payload,
    };
  }
  static AddPostSuccess(payload) {
    return {
      type: ADD_POST_SUCCESS,
      payload,
    };
  }
  static AddPostFailure() {
    return {
      type: ADD_POST_FAILURE,
    };
  }
  static GetPosts() {
    return {
      type: GET_POSTS,
    };
  }
  static GetPostsSuccess(payload) {
    return {
      type: GET_POSTS_SUCCESS,
      payload,
    };
  }
  static GetPostsFailure() {
    return {
      type: GET_POSTS_FAILURE,
    };
  }

  static WeatherCheck(payload) {
    return {
      type: WEATHER_CHK,
      payload,
    };
  }
  static WeatherCheckSuccess(payload) {
    return {
      type: WEATHER_CHK_SUCCESS,
      payload,
    };
  }
  static WeatherCheckFailure() {
    return {
      type: WEATHER_CHK_FAILURE,
    };
  }
  static GetToken() {
    return {
      type: GET_TOKEN,
    };
  }
  static GetTokenSuccess(payload) {
    return {
      type: GET_TOKEN_SUCCESS,
      payload,
    };
  }
  static GetTokenFailure() {
    return {
      type: GET_TOKEN_FAILURE,
    };
  }

  static SearchSong(payload) {
    return {
      type: SEARCH_SONG,
      payload,
    };
  }
  static SearchSongSuccess(payload) {
    return {
      type: SEARCH_SONG_SUCCESS,
      payload,
    };
  }
  static SearchSongFailure() {
    return {
      type: SEARCH_SONG_FAILURE,
    };
  }

  static LoaderTrue() {
    return {
      type: LOADER_TRUE,
    };
  }
  static LoaderFalse() {
    return {
      type: LOADER_FALSE,
    };
  }
}
