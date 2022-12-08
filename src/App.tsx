/** @format */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

import { QuestionData, RawQuestion } from './models/Question';
import { Tag } from './models/Tag';
import { RawRecord } from './models/Record';
import { QuestionLayout } from './components/QuestionLayout';
import { EditQuestion } from './components/EditQuestion';
import { NewQuestion } from './components/NewQuestion';
import { Question } from './components/Question';
import { QuestionList } from './components/QuestionList';
import { SideBar } from './components/SideBar';

function App() {
	const [questions, setQuestions] = useLocalStorage<RawQuestion[]>(
		'QUESTIONS',
		[]
	);
	const [records, setRecords] = useLocalStorage<RawRecord[]>('RECORDS', []);
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);
	const [answeredToday, setAnsweredToday] = useLocalStorage<RawRecord[]>(
		'ANSWERED TODAY',
		[]
	);

	const questionsWithTags = useMemo(() => {
		return questions.map((question) => {
			return {
				...question,
				tags: tags.filter((tag) => question.tagIds.includes(tag.id)),
			};
		});
	}, [questions, tags]);

	function onCreateQuestion({ tags, ...data }: QuestionData) {
		setQuestions((prevQuestions) => {
			return [
				...prevQuestions,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			];
		});
	}

	function onUpdateQuestion(id: string, { tags, ...data }: QuestionData) {
		setQuestions((prevQuestions) => {
			return prevQuestions.map((question) => {
				if (question.id === id) {
					return { ...question, ...data, tagIds: tags.map((tag) => tag.id) };
				} else {
					return question;
				}
			});
		});
	}

	function deleteQuestion(id: string) {
		setQuestions((prevQuestions) => {
			return prevQuestions.filter((question) => question.id !== id);
		});
		setRecords((prevRecords) => {
			return prevRecords.filter((record) => record.questionId !== id);
		});
	}
	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag]);
	}

	function updateTag(id: string, label: string) {
		setTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label };
				} else {
					return tag;
				}
			});
		});
	}

	function deleteTag(id: string) {
		setTags((prevTags) => {
			return prevTags.filter((tag) => tag.id !== id);
		});
	}

	const onAnswerQuestion = (isCorrect: boolean, id: string): void => {
		const record: RawRecord = {
			id: uuidV4(),
			questionId: id,
			createdAt: new Date(Date.now()),
			isCorrect: isCorrect,
		};

		setRecords((prevRecords) => {
			return [...prevRecords, record];
		});

		setAnsweredToday((prevAnsweredToday) => {
			const prev = prevAnsweredToday.filter(
				(p) =>
					new Date(p.createdAt).toDateString() ===
					new Date(Date.now()).toDateString()
			);
			return [...prev, record];
		});
	};

	return (
		<Container className='my-4'>
			<div className='row'>
				<div className='col-md-9'>
					<Routes>
						<Route
							path='/'
							element={
								<QuestionList
									questions={questionsWithTags}
									availableTags={tags}
									answeredToday={answeredToday}
									updateTag={updateTag}
									deleteTag={deleteTag}
									deleteQuestion={deleteQuestion}
									onAnswerQuestion={onAnswerQuestion}
								/>
							}
						/>
						<Route
							path='/new'
							element={
								<NewQuestion
									onSubmit={onCreateQuestion}
									onAddTag={addTag}
									availableTags={tags}
								/>
							}
						/>

						<Route
							path='/:id'
							element={<QuestionLayout questions={questionsWithTags} />}>
							<Route index element={<Question onDelete={deleteQuestion} />} />
							<Route
								path='edit'
								element={
									<EditQuestion
										onSubmit={onUpdateQuestion}
										onAddTag={addTag}
										availableTags={tags}
									/>
								}
							/>
						</Route>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</div>
				<div className='col-md-3'>
					<SideBar records={records} answeredToday={answeredToday} />
				</div>
			</div>
		</Container>
	);
}

export default App;
