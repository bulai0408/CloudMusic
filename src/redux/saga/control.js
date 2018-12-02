import {  takeEvery, put } from "redux-saga/effects";
import { NavigationActions } from 'react-navigation';

import toast from '../../util';
import { GET_CONTROL_REQUEST, GET_CONTROL_SUCCEED, GET_CONTROL_FAILED } from '../constant';

function* getControl({ control, navigation }) {
    console.log(666);
    console.log(control);
    try {
        yield put({ type: GET_CONTROL_SUCCEED, control });
        // yield navigation.dispatch(NavigationActions.navigate({ routeName: 'Listen' }));
    } catch (e) {
        yield put({ type: GET_CONTROL_FAILED, error: e.message });
        toast('服务器开小差了...', 'TOP');
    }
}

export function* watchGetControl() {
    yield takeEvery(GET_CONTROL_REQUEST, getControl);
}



