import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GlobalStyle from "../components/GlobalStyle";
import "../App.css";
import { useNavigate } from "react-router-dom";
import CardOne from "../components/CardOne";
import { Container } from "../duplications/common";
import { useState } from "react";
import { todoAdd, todoDelete, todoDone } from "../redux/modules/todos";
import uuid from "react-uuid";

const InputContainer = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
`;

function Home() {
	const todos = useSelector((state) => {
		return state.todos;
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		titleInput: "",
		contextInput: "",
		dateInput: "",
	});
	const { titleInput, contextInput, dateInput } = inputs; // 비구조화 할당을 통해 값 추출

	const onChangeHandler = (e) => {
		const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

		setInputs({
			...inputs, // 기존의 input 객체를 복사한 뒤
			[name]: value, // name 키를 가진 값을 value 로 설정
		});
	};

	const saveBtnClickHandler = () => {
		const todo = {
			id: uuid(),
			title: titleInput,
			context: contextInput,
			isDone: false,
			date: dateInput,
		};

		setInputs({
			title: "",
			body: "",
		});

		dispatch(todoAdd(todo));
	};
	// Complete Page와 중복되는 함수
	const BtnClickHandler = (event, id) => {
		event.target.name === "deleteBtn" ? dispatch(todoDelete(id)) : dispatch(todoDone(id));
	};

	return (
		<>
			<GlobalStyle />
			<div className="App">
				<div className="save-Box">
					<InputContainer className="inputTitle">
						<label>제목</label>
						<input
							name="titleInput"
							onChange={onChangeHandler}
							value={titleInput}
							maxLength={15}
							type="text"
							placeholder="제목을 입력하세요.(최대 15자)"
						/>
						<label>기한 날짜</label>
						<input name="dateInput" value={dateInput} onChange={onChangeHandler} type="date" />
					</InputContainer>
					<InputContainer className="inputContext">
						<label>상세 내역</label>
						<textarea
							name="contextInput"
							onChange={onChangeHandler}
							value={contextInput}
							cols={30}
							rows={4}
							type="text"
							placeholder="내용을 입력하세요."
						/>
					</InputContainer>
					<InputContainer className="buttonBox">
						<button onClick={saveBtnClickHandler}> 저장하기 </button>
					</InputContainer>
				</div>
				<div className="Card-List">
					<button
						style={{
							color: "red",
						}}
					>
						🕐 해야할 일
					</button>
					<button
						onClick={() => {
							navigate("/complete");
						}}
					>
						🎉완료 List
					</button>
					<Container>
						{todos.map((card) => {
							if (card.isDone === false) {
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

export default Home;
