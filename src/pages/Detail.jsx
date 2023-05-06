import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../components/GlobalStyle";
import { todoModify } from "../redux/modules/todos";

const DetailContainer = styled.div`
	display: flex;
	width: 50%;
	justify-content: space-between;
	margin: 280px auto;
	font-size: 20px;
`;

const StyledDiv = styled.div`
	width: 33%;
	background-color: #d9d9d9;
	justify-content: center;
	padding: 5px;
	border-radius: 5px;
	opacity: 0.85;
`;

function Detail() {
	const navigate = useNavigate();
	const todos = useSelector((state) => state.todos);
	//const Content = useSelector(state => state.SaveContent);
	const dispatch = useDispatch();
	const params = useParams();

	const [todo, setTodo] = useState({});
	const [inputs, setInputs] = useState({
		titleInput: "",
		contextInput: "",
		dateInput: "",
	});
	const { titleInput, contextInput, dateInput } = inputs; // 비구조화 할당을 통해 값 추출

	useEffect(() => {
		const todo = todos.find((card) => {
			return card.id === params.id;
		});

		setTodo({ ...todo });
		console.log(todo);
	}, []);

	// Home 과 중복
	const contentChangeHandler = (event) => {
		const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
		setInputs({
			...inputs, // 기존의 input 객체를 복사한 뒤
			[name]: value, // name 키를 가진 값을 value 로 설정
		});
		setTodo({ ...todo, title: titleInput, context: contextInput, date: dateInput });
	};

	//Complete Page와 중복됨
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

	const changeBtnClickHandler = () => {
		dispatch(todoModify(todo));
		whenPageMovedInputValueClear("/");
	};

	return (
		<>
			<GlobalStyle />
			<DetailContainer>
				<StyledDiv>
					<h1
						style={{
							textAlign: "center",
						}}
					>
						원문
					</h1>
					<p>ID : {todo?.id}</p>
					<p>제목 : {todo?.title}</p>
					<p>본문 : {todo?.context}</p>
					<p>날짜 : {todo?.date}</p>
				</StyledDiv>
				<StyledDiv>
					<h1
						style={{
							textAlign: "center",
						}}
					>
						변경
					</h1>
					<p>ID : {todo?.id}</p>
					<p style={{}}>
						제목 : <input name="titleInput" type="text" onChange={contentChangeHandler} placeholder={todo?.title} />
					</p>
					<p
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						본문 :&nbsp;
						<textarea name="contextInput" rows={5} type="text" onChange={contentChangeHandler} placeholder={todo?.context} />
					</p>
					<p>
						날짜 : <input name="dateInput" type="date" onChange={contentChangeHandler} />
					</p>
					<StyledDiv
						style={{
							display: "flex",
							width: "60%",
							marginLeft: 50,
							marginTop: 10,
							marginBottom: 10,
							gap: 20,
						}}
					>
						<button
							onClick={() => {
								whenPageMovedInputValueClear("/");
							}}
						>
							이전으로
						</button>
						<button onClick={changeBtnClickHandler}>수정하기</button>
					</StyledDiv>
				</StyledDiv>
			</DetailContainer>
		</>
	);
}

export default Detail;
