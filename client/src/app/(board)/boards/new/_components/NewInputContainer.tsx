/** @format */

import { ITitle, RNewTitle } from '@/models/board.type';

import NewInput from './NewInput';
import React from 'react';

const NewInputContainer = React.memo(({ title, error, value }: ITitle) => {
	return (
		<div className="prose-me_16_24 flex flex-1 flex-col gap-2">
			<div className="flex gap-1">
				<label className="text-gray-800">{RNewTitle[title]}</label>
				{title !== 'YoutubeUrl' && <div className="text-red-500">*</div>}
			</div>
			<NewInput title={title} value={value} />

			<div className="text-red-500">{error}</div>

			{title !== 'Author' && title !== 'Password' && (
				<div className="mt-10 border-b-[1px] border-gray-200"></div>
			)}
		</div>
	);
});

export default NewInputContainer;
