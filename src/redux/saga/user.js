import { call, takeEvery, put } from "redux-saga/effects";
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

import toast from '../../util';
import { PHONE_LOGIN_REQUEST, EMAIL_LOGIN_REQUEST, PHONE_LOGIN_SUCCEED, EMAIL_LOGIN_SUCCEED, PHONE_LOGIN_FAILURE, EMAIL_LOGIN_FAILURE } from '../constant';

function* phoneLogin({ info: { phone, password }, navigation }) {
    try {
        const user = yield call(axios.get, `http://cloud-music-api.cyhbulai.top/login/cellphone?phone=${phone}&password=${password}`);
        yield put({ type: PHONE_LOGIN_SUCCEED, user: user.data.account });
        const resetToHome = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        });
        navigation.dispatch(resetToHome);
    } catch (e) {
        toast('账号或密码错误', 'TOP');
        yield put({ type: PHONE_LOGIN_FAILURE, error: e.message })
    }
}

function* emailLogin({ info: { email, password }, navigation }) {
    try {
        const user = yield call(axios.get, `http://cloud-music-api.cyhbulai.top/login/email?email=${email}&password=${password}`);
        yield put({ type: EMAIL_LOGIN_SUCCEED, user });
        const resetToHome = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        });
        navigation.dispatch(resetToHome);
    } catch (e) {
        toast('账号或密码错误', 'TOP');
        yield put({ type: EMAIL_LOGIN_FAILURE, error: e.message })
    }
}

export function* watchPhoneLogin() {
    yield takeEvery(PHONE_LOGIN_REQUEST, phoneLogin);
}

export function* watchEmailLoginn() {
    yield takeEvery(EMAIL_LOGIN_REQUEST, emailLogin);
}
