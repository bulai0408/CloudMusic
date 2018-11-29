import {all, fork} from 'redux-saga/effects';
import * as userSagas from "./user";
import * as songSagas from "./song";



export default function* rootSaga() {
    yield all([
        ...Object.values(userSagas).map(fork),
        ...Object.values(songSagas).map(fork),
    ]);
}