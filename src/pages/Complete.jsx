import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardOne from "../components/CardOne";
import GlobalStyle from "../components/GlobalStyle";
import { Container } from "../duplications/common";
import { todoDelete, todoDone } from "../redux/modules/todos";

function Complete() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	// Detail과 중복함수
	const whenPageMovedInputValueClear = (page) => {
		dispatch({
			type: "clear",
			payLoad: {
				title: "",
				date: "",
				context: "",
			},
		});
		navigate(`${page}`);
	};
	// Home 중복함수
	const BtnClickHandler = (event, id) => {
		event.target.name === "deleteBtn" ? dispatch(todoDelete(id)) : dispatch(todoDone(id));
	};

	return (
		<>
			<GlobalStyle />
			<div className="App">
				<div className="Card-List">
					<button
						onClick={() => {
							whenPageMovedInputValueClear("/");
						}}
					>
						🕐 해야할 일
					</button>
					<button
						style={{
							color: "red",
						}}
					>
						🎉완료 List
					</button>
					<Container>
						{todos.map((card) => {
							if (card.isDone === true) {
								return <CardOne BtnClick={BtnClickHandler} key={card.id} card={card} />;
							}
							return null;
						})}
					</Container>
				</div>
			</div>
		</>
	);
}

export default Complete;
