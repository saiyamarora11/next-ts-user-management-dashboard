import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
	children: ReactNode;
	id: string;
	openModal: boolean;
	onClose: () => void;
};

const Modal = ({ children, id, openModal, onClose }: ModalProps) => {
	return openModal ? (
		<>
			<input
				type="checkbox"
				id={id}
				className="modal-toggle"
				checked={openModal}
				readOnly
			/>
			<div className="modal" role="dialog">
				<div className="modal-box relative">
					<button
						onClick={onClose}
						className="absolute right-3 top-3">
						<XMarkIcon className="size-5 stroke-[2px] text-gray-500" />
					</button>
					{children}
				</div>
				<label
					className="modal-backdrop"
					htmlFor={id}
					onClick={onClose}>
					Close
				</label>
			</div>
		</>
	) : null;
};

export default Modal;
