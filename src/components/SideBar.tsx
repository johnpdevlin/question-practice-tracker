/** @format */

import { ResultsChart } from './ResultsChart';
import { Record } from '../models/Record';
import { useState } from 'react';
import { Tag } from '../models/Tag';

type sidebarProps = {
	records: Record[];
	availableTags: Tag[];
};

export function SideBar({ records, availableTags }: sidebarProps) {
	return (
		<>
			<ResultsChart records={records} availableTags={availableTags} />
		</>
	);
}
