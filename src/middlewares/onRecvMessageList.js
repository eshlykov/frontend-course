import {RECV_MESSAGE_LIST_SUCCESS, RECV_MESSAGE_LIST_FAILURE} from "../reducers/recvMessageList";
import {getErrorMessage} from '../utils/getErrorMessage'

const RECV_MESSAGE_LIST = 'RECV_MESSAGE_LIST';

const onRecvMessageList = store => next => action => {
    if (action.type !== RECV_MESSAGE_LIST) {
        return next(action);
    }

    const {request, token} = action.payload;

    fetch(request, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(messageList => {
        store.dispatch({
            type: RECV_MESSAGE_LIST_SUCCESS,
            payload: {
                messageList,
                error: null,
            },
        });
    }).catch(promise => {
        promise.then(response => {
            store.dispatch({
                type: RECV_MESSAGE_LIST_FAILURE,
                payload: {
                    messageList: [],
                    error: getErrorMessage(response),
                }
            })
        });
    });
};

export const onRecvMessageListAction = (payload) => ({
    type: RECV_MESSAGE_LIST,
    payload
});

export default onRecvMessageList;