/** @format */
'use client';

import { useEffect, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';

import BoardCommentStar from './BoardCommentStar';
import BoardCommentTextareaWrapper from './BoardCommentTextareaWrapper';
import CommonButton from '../../_components/CommonButton';
import { EButtonTitle } from '@/models/button.type';
import { ETitle } from '@/models/board.type';
import NewInputContainer from '../../new/_components/NewInputContainer';
import { boardUrlEndPoint } from '@/apis/config';
import createBoardCommentAction from '@/actions/createBoardCommentAction';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';

export default function BoardCommentForm() {
	const param = useParams();

	const [rating, setRating] = useState<number>(0);

	const [state, formAction] = useFormState(createBoardCommentAction, {
		result: '',
		boardId: param.boardId,
		error: undefined,
	});

	const { data, mutate } = useSWR(`${boardUrlEndPoint}/${param.boardId}/comment`, null, {
		revalidateOnFocus: false,
	});

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!state?.result) return;
		formRef.current?.reset();
		setRating(0);
		if (Array.isArray(data)) {
			mutate([...data, state.result], false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<form action={formAction} className="flex flex-col gap-4" ref={formRef}>
			<BoardCommentStar rating={rating} setRating={setRating} />
			<div className="flex items-center gap-8">
				<div className="flex w-1/2 gap-4">
					<NewInputContainer title={ETitle.Author} />
					<NewInputContainer title={ETitle.Password} />
				</div>
				<div className="prose-me_16_24 text-red-500">{state?.error}</div>
			</div>
			<BoardCommentTextareaWrapper />
			<div className="flex justify-end">
				<CommonButton title={EButtonTitle.Comment} />
			</div>
		</form>
	);
}
