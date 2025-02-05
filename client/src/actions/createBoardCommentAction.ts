/** @format */
'use server';

import postComment from '@/apis/comments/postComment';

export default async function createBoardCommentAction(
	prevState: { boardId: number; parentId: string | null },
	formData: { get: (arg0: string) => string | null },
) {
	const boardId: number = prevState.boardId;
	const parentId: string | null = prevState.parentId;
	const author: string | null = formData.get('Author');
	const password: string | null = formData.get('Password');
	const content: string | null = formData.get('Comment');
	const stringRating: string | null = formData.get('Rating');

	const rating: number | null = stringRating ? Number(stringRating) : null;

	if (!author || !password || !content || (!parentId && !rating)) {
		return {
			parentId: parentId,
			boardId: boardId,
			error: '댓글을 정확히 입력해주세요',
			result: '',
		};
	}

	const result = await postComment({ author, password, content, rating, parentId }, boardId);

	if (typeof result === 'string') {
		return {
			boardId: boardId,
			error: result,
			result: '',
		};
	} else if (typeof result === 'object') {
		return {
			boardId: boardId,
			error: undefined,
			result: result.data,
		};
	}
}
