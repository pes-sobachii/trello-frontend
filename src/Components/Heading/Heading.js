import React, {useState} from 'react';
import useCreateList from "../../app/hooks/useCreateList";
import styles from './Heading.module.css'

const Heading = ({order, setOrder}) => {

    const [inputState, setInputState] = useState('')
    const {mutateAsync: listCreate} = useCreateList()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        listCreate(inputState)
        setInputState('')
    }

    return (
        <div>
            <div className={styles.container}>
                <form className={styles.inputRow} onSubmit={onSubmitHandler}>
                    <label htmlFor='list' className={styles.label}>
                        Create a new list
                    </label>
                    <div className={styles.inputFrame}>
                        <input
                            className={styles.input}
                            type='text'
                            name='list'
                            placeholder='Enter a title of a list...'
                            value={inputState}
                            onChange={(e) => setInputState(e.target.value)}
                        />
                        <button type='submit' className={styles.addButton}>
                            Add
                        </button>
                    </div>
                </form>
            </div>
            <h4 className={styles.buttonsTitle}>Order by creation date</h4>
            <div className={styles.order}>
                <button className={order === 'asc' ? styles.active : ''} onClick={() => setOrder('asc')}>Asc</button>
                <button className={order === 'desc' ? styles.active : ''} onClick={() => setOrder('desc')}>Desc</button>
            </div>
        </div>
    );
};

export default Heading;