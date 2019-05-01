import {createAction, createReducer} from 'redux-act';

export const RECV_MESSAGE_LIST_SUCCESS = 'RECV_MESSAGE_LIST_SUCCESS';
const recvMessageListSuccessAction = createAction(RECV_MESSAGE_LIST_SUCCESS);

export const RECV_MESSAGE_LIST_FAILURE = 'RECV_MESSAGE_LIST_FAILURE';
const recvMessageListFailureAction = createAction(RECV_MESSAGE_LIST_FAILURE);

export const TRY_UPDATE_MESSAGE_LIST = 'TRY_UPDATE_MESSAGE_LIST';
const tryUpdateMessageListAction = createAction(TRY_UPDATE_MESSAGE_LIST);

const updateMessageList = (state, newMessage) => {
    if (state.conversationId !== newMessage.conversationId) {
        return state.messageList;
    }

    return [...state.messageList, newMessage];
};

const recvMessageList = createReducer({
    [recvMessageListSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvMessageListFailureAction]: (state, payload) => ({ ...state, ...payload}),
    [tryUpdateMessageListAction]: (state, payload) => ({
        ...state,
        ...payload,
        messageList: updateMessageList(state, payload.newMessage),
    }),
}, { messageList: [], conversationId: "public" });

export default recvMessageList;
