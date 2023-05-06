import { createStore } from "redux";
import { combineReducers } from "redux";
import Card from "../modules/Card";
import SaveContent from "../modules/SaveContent";
import todos from "../modules/todos";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

const rootReducer = combineReducers({
	// Card,
	// SaveContent,
	todos,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
