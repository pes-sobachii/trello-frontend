import styles from './Modal.module.css'

import React, {useRef} from 'react';
import useCardCreate from "../../app/hooks/useCardCreate";

const Modal = ({setModal, modal}) => {

    const {isLoading, mutateAsync: cardCreate} = useCardCreate()
    const wrapperRef = useRef(null)

    const onCreateHandler = async () => {
        await cardCreate({
            title: modal.task ? modal.task : 'untitled',
            list: modal.list
        })
        setModal({
            active: false,
            task: '',
            list: ''
        })
    }

    return (
			<div
				ref={wrapperRef}
				className={styles.wrapper}
				onClick={(e) => {
					if (e.target === wrapperRef.current)
						setModal({
							...modal,
							active: false,
						})
				}}
			>
				<div className={styles.container}>
					<input
						type='text'
						value={modal.task}
						onChange={(e) =>
							setModal({
								...modal,
								task: e.target.value,
							})
						}
					/>
					<div className={styles.buttons}>
						<button disabled={isLoading} onClick={onCreateHandler}>
							Create
						</button>
						<button
							onClick={() =>
								setModal({
									...modal,
									active: false,
								})
							}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		)
};

export default Modal;