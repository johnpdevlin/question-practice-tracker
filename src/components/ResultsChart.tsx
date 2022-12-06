/** @format */
import { Form } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import ReactSelect from 'react-select';
import { useState, useMemo, useEffect } from 'react';

import { Record } from '../models/Record';
import { Tag } from '../models/Tag';

const options = {
	pieHole: 0.5,
	is3D: true,
	legend: 'none',
	colors: ['#6af3cf', '#f64663'],
	chartArea: { width: '70%', height: '70%' },
};

const chartKeys: string[] = ['Answered', 'Value'];

type chartProps = {
	records: Record[];
	availableTags: Tag[];
};

export function ResultsChart({ records, availableTags }: chartProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [isToday, setIsToday] = useState<Boolean>(false);
	const [chartValues, setChartValues] = useState<(String | Number)[][]>([]);

	const filteredByTag = useMemo(() => {
		return records.filter((record) => {
			return (
				selectedTags.length === 0 ||
				selectedTags.every((tag) =>
					selectedTags.some((tag) => tag.id === tag.id)
				)
			);
		});
	}, [selectedTags, records]);

	const filteredRecords = useMemo(() => {
		if (isToday!) {
			return filteredByTag.filter((record) => {
				return record.createdAt === new Date(Date.now());
			});
		} else if (!isToday) {
			return filteredByTag;
		}
	}, [isToday, filteredByTag]);

	function onSwitchPeriod() {
		if (isToday!) {
			return setIsToday(false);
		} else if (!isToday) {
			return setIsToday(true);
		}
	}

	useEffect(() => {
		const correct: Number = filteredRecords!.filter((record) => {
			return record.isCorrect === true;
		}).length;
		const incorrect: Number = filteredRecords!.filter((record) => {
			return record.isCorrect === false;
		}).length;
		setChartValues([
			['Right', correct],
			['Wrong', incorrect],
		]);
	}, [filteredRecords]);

	return (
		<>
			<div className='card mb-2'>
				<h5 className='card-header'>
					{isToday ? 'Results (Today)' : 'Results (All Time)'}
					<button
						type='button'
						className='btn btn-outline-primary ms-4 my-2'
						onClick={onSwitchPeriod}>
						Switch
					</button>
				</h5>
				<div className='card-body'>
					<Chart
						chartType='PieChart'
						width='100%'
						height='200px'
						data={[chartKeys, ...chartValues]}
						options={options}
					/>
				</div>
				<Form.Group controlId='tags' className='mx-3 mb-3'>
					<ReactSelect
						placeholder='Filter by tags...'
						value={selectedTags.map((tag) => {
							return { label: tag.label, value: tag.id };
						})}
						options={availableTags.map((tag) => {
							return { label: tag.label, value: tag.id };
						})}
						onChange={(tags) => {
							setSelectedTags(
								tags.map((tag) => {
									return { label: tag.label, id: tag.value };
								})
							);
						}}
						isMulti
					/>
				</Form.Group>
			</div>
		</>
	);
}
