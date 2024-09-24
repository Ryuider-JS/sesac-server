/** @format */

import BoardItemContainer from './_components/BoardItemContainer';

export default function Board() {
	return (
		<div className="w-full rounded-2xl shadow  flex flex-col px-12 py-6 gap-6 text-[#1c1c1c] prose-me_16_20">
			<div className="w-full flex px-6 py-4 gap-2 ">
				<div className="w-16 flex justify-center items-center">번호</div>
				<div className="w-full">제목</div>
				<div className="w-[100px] flex justify-center items-center">작성자</div>
				<div className="w-[100px] flex justify-center items-center">날짜</div>
			</div>
			<BoardItemContainer />
		</div>
	);
}