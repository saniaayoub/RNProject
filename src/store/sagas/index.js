import {AppMiddleware} from '../middlewares';
import {takeLatest, all} from 'redux-saga/effects';
import {
  ADD_POST,
  GET_POSTS,
  LOGOUT,
  SIGNUP,
  SIGNIN,
  SAVE_INFO,
  GET_INFO,
  SEND_EMAIL,
  IMG_UPLOAD,
  IMG_RET,
  WEATHER_CHK,
  GET_TOKEN,
  SEARCH_SONG,
} from '../constants';

export function* Sagas() {
  yield all([
    yield takeLatest(SIGNIN, AppMiddleware.SignIn),
    yield takeLatest(SIGNUP, AppMiddleware.signUp),
    yield takeLatest(ADD_POST, AppMiddleware.AddPost),
    yield takeLatest(GET_POSTS, AppMiddleware.GetPosts),
    yield takeLatest(LOGOUT, AppMiddleware.Logout),
    yield takeLatest(SAVE_INFO, AppMiddleware.SaveInfo),
    yield takeLatest(GET_INFO, AppMiddleware.GetInfo),
    yield takeLatest(SEND_EMAIL, AppMiddleware.SendEmail),
    yield takeLatest(IMG_UPLOAD, AppMiddleware.ImgUpload),
    yield takeLatest(IMG_RET, AppMiddleware.ImgRetrieve),
    yield takeLatest(WEATHER_CHK, AppMiddleware.WeatherCheck),
    yield takeLatest(GET_TOKEN, AppMiddleware.GetToken),
    yield takeLatest(SEARCH_SONG, AppMiddleware.SearchSong),
  ]);
}
