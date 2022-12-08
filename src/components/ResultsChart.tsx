/** @format */
import { Form } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import ReactSelect from 'react-select';
import { useState, useMemo, useEffect } from 'react';

import { RawRecord } from '../models/Record';
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
	records: RawRecord[];
	answeredToday: RawRecord[];
};

export function ResultsChart({ records, answeredToday }: chartProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [isToday, setIsToday] = useState<Boolean>(false);
	const [chartValues, setChartValues] = useState<(String | Number)[][]>([]);

	function onSwitchPeriod() {
		if (isToday!) {
			return setIsToday(false);
		} else if (!isToday) {
			return setIsToday(true);
		}
	}

	useMemo(() => {
		let correct: Number = 0;
		let incorrect: Number = 0;

		if (isToday!) {
			correct = answeredToday.filter((a) => a.isCorrect === true).length;
			incorrect = answeredToday.filter((a) => a.isCorrect === false).length;
		} else if (!isToday) {
			correct = records.filter((r) => r.isCorrect === true).length;
			incorrect = records.filter((r) => r.isCorrect === false).length;
		}

		setChartValues([
			['Right', correct],
			['Wrong', incorrect],
		]);
	}, [records, isToday]);

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
			</div>
		</>
	);
}
