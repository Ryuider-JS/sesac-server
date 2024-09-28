/** @format */

import { IApiResponseData } from '@/models/apiResponse';
import { api } from '../config';
import { IBoardReader } from '@/models/boardReaderResponse';
//

export default function getBoard(boardId: number): IBoardReader {
	let status = 'pending';

	let board: IApiResponseData | Promise<IApiResponseData>;
	const response = api
		.get(`/board/${boardId}`)
		.then((response) => {
			setTimeout(() => {
				board = response.data.data;
				status = 'fulfilled';
			}, 2000);
		})
		.catch((e) => {
			status = 'reject';
			board = e;
		});

	return {
		read() {
			if (status === 'pending') {
				throw response;
			} else if (status === 'reject') throw board;
			else if (status === 'fulfilled') return board;
		},
	};
}