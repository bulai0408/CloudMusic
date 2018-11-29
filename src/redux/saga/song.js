import { call, takeEvery, put } from "redux-saga/effects";
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

import toast from '../../util';

function* getSongUrl({ id }) {
    try {
        const { data: { data } } = yield call(axios.get, `song/url?id=${id}`);
        yield put({ type: 'GET_SONG_URL_SUCCEED', url: data[0].url });
        return data[0].url
    } catch (e) {
        yield put({ type: 'GET_SONG_URL_FAILED', error: e.message });
        toast('服务器开小差了...', 'TOP');
    }
}

function* getSongDetail({ ids }) {
    try {
        const { data: { songs } } = yield call(axios.get, `song/detail?ids=${ids}`);
        yield put({ type: 'GET_SONG_DETAIL_SUCCEED', detail: songs[0] });
    } catch (e) {
        yield put({ type: 'GET_SONG_DETAIL_FAILED', error: e.message });
        toast('服务器开小差了...', 'TOP');
    }
}

export function* watchGetSongUrl() {
    yield takeEvery('GET_SONG_URL', getSongUrl);
}

export function* watchGetSongDetail() {
    yield takeEvery('GET_SONG_DETAIL', getSongDetail);
}

