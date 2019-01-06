import {all, fork} from 'redux-saga/effects';
import * as userSagas from "./user";
import * as songSagas from "./song";
import * as controlSagas from "./control";
import * as songListSagas from "./songList";



export default function* rootSaga() {
    yield all([
        ...Object.values(userSagas).map(fork),
        ...Object.values(songSagas).map(fork),
        ...Object.values(controlSagas).map(fork),
        ...Object.values(songListSagas).map(fork),
    ]);
}