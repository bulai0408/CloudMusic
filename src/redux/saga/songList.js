import { takeEvery, put } from "redux-saga/effects";
import { NavigationActions } from 'react-navigation';

import toast from '../../util';
import { POST_ADD_SONGLIST, POST_ADD_SONGLIST_SUCCEED, POST_ADD_SONGLIST_FAILURE } from '../constant';

function* addSongList(a) {
    try {
        console.log(a);
        // const songListInfo = yield call(axios.get, `http://cloud-music-api.cyhbulai.top/playlist/create?name=${name}`);
        // console.log(songListInfo);
        // yield put({ type: POST_ADD_SONGLIST_SUCCEED, songListInfo });
        // yield navigation.dispatch(NavigationActions.navigate({ routeName: 'Listen' }));
    } catch (e) {
        yield put({ type: POST_ADD_SONGLIST_FAILURE, error: e.message });
        toast('服务器开小差了...', 'TOP');
    }
}

export function* watchAddSonglist() {
    yield takeEvery(POST_ADD_SONGLIST, addSongList);
}



