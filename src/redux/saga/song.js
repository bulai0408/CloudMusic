import { takeEvery, put } from "redux-saga/effects";
import { NavigationActions } from 'react-navigation';

import toast from '../../util';
import { GET_SONG_ID_REQUEST, GET_SONG_ID_SUCCEED, GET_SONG_ID_FAILED } from '../constant';

function* getSongId({ id, navigation }) {
    try {
        yield put({ type: GET_SONG_ID_SUCCEED, id });
        yield navigation.dispatch(NavigationActions.navigate({ routeName: 'Listen' }));
    } catch (e) {
        yield put({ type: GET_SONG_ID_FAILED, error: e.message });
        toast('服务器开小差了...', 'TOP');
    }
}

export function* watchGetUrl() {
    yield takeEvery(GET_SONG_ID_REQUEST, getSongId);
}



