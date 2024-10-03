/** @format */

import { IModalProps } from '@/models/children.type';
import ModalContainer from '../_components/ModalContainer';

export default function ModalPage({ searchParams }: IModalProps) {
	return searchParams.modal && <ModalContainer modal={searchParams.modal} />;
}
