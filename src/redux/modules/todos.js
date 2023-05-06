const ADD = "todos/ADD";
const DONE = "todos/DONE";
const DELETE = "todos/DELETE";
const MODIFY = "todos/MODIFY";

export const todoAdd = (payload) => {
	return {
		type: ADD,
		payload: payload,
	};
};

export const todoDone = (id) => {
	return {
		type: DONE,
		id,
	};
};

export const todoDelete = (id) => {
	return {
		type: DELETE,
		id,
	};
};

export const todoModify = (payload) => {
	return {
		type: MODIFY,
		payload,
	};
};

const initialState = [
	// {
	// id(pin):"b1ad1690-9ee7-df3a-e5b1-bc2222822a9c"
	// title(pin):"a"
	// context(pin):"a"
	// isDone(pin):false
	// date(pin):"2023-05-05"
	// },
];

// 리듀서
const todos = (state = initialState, action) => {
	switch (action.type) {
		// case INIT:
		// 	return [...action.payload];
		case ADD:
			return [...state, action.payload];
		case DONE:
			return state.map((item) => (item.id === action.id ? { ...item, isDone: !item.isDone } : item));
		case DELETE:
			return state.filter((item) => item.id !== action.id);
		case MODIFY:
			return state.map((item) => (item.id === action.payload.id ? action.payload : item));
		default:
			return state;
	}
};

// 모듈파일에서는 리듀서를 export default 한다.
export default todos;
