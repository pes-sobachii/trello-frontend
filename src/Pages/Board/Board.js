import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import React, {useState} from "react";
import moment from 'moment';

import {useListDelete, useGetList, useCardDelete, useCardUpdate, useEmptyList} from "../../app/hooks/Hooks.js";
import Modal from "../../Components/Modal/Modal";
import Heading from "../../Components/Heading/Heading";
import ListPlug from "../../Components/Plugs/ListPlug";
import BoardPlug from "../../Components/Plugs/BoardPlug";
import onDragEnd from "../../utils/onDragEnd";
import {orderSort} from "../../utils/orderSort";
import styles from './Board.module.css'

const Board = () => {

    const [listsState, setListsState] = useState([])
    const [sortOrder, setSortOrder] = useState('asc')
    const [modalState, setModalState] = useState({
        task: '', list: '', active: false
    })

    const {mutateAsync: listDelete} = useListDelete()
    const {mutateAsync: cardUpdate} = useCardUpdate()
    const {mutateAsync: cardDelete} = useCardDelete()
    const {mutateAsync: emptyList} = useEmptyList()
    useGetList(setListsState)

    return (
        <div className={styles.container}>
            {modalState.active && <Modal modal={modalState} setModal={setModalState}/>}
            <Heading order={sortOrder} setOrder={setSortOrder}/>
            <div className={styles.row}>
                <DragDropContext onDragEnd={result => onDragEnd(result, listsState, setListsState, cardUpdate)}>
                    {listsState.length <= 0 ? <BoardPlug/> : listsState.map((list, index) => {
                        return (<div key={index} className={styles.column}>
                            <div className={styles.listTitle}>{list.title}</div>
                            <div className={styles.list}>
                                <div className={styles.listHeader}>
                                    <button onClick={() => {
                                        setModalState({
                                            ...modalState, active: true, list: list._id
                                        })
                                    }}>
                                        Add Card
                                    </button>
                                    <button onClick={async () => {
                                        await listDelete(list._id)
                                    }}>
                                        Remove List
                                    </button>
                                    <button onClick={async () => {
                                        await emptyList(list._id)
                                    }}>
                                        Empty List
                                    </button>
                                </div>
                                <Droppable droppableId={list._id} key={index}>
                                    {(provided, snapshot) => {
                                        return (<div {...provided.droppableProps}
                                                     ref={provided.innerRef}
                                                     style={{
                                                         background: snapshot.isDraggingOver ? "lightblue" : "transparent",
                                                         padding: 5,
                                                         width: '100%',
                                                         minHeight: '500px',
                                                     }}>
                                            {list.cards.length === 0 && <ListPlug/>}
                                            {list.cards.sort((x, y) => orderSort(x, y, sortOrder)).map((card, index) => {

                                                const date = new Date(card.updatedAt)
                                                const timeago = moment(date).fromNow()

                                                return <Draggable key={card._id} draggableId={card._id}
                                                                  index={index}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                             title={card.title}
                                                             className={styles.task}
                                                             draggable='true'>
                                                            <p className={styles.taskText}>{card.title}</p>
                                                            <p className={styles.taskDate}>{timeago}</p>
                                                            <button className={styles.taskButton}
                                                                    onClick={() => cardDelete(card._id)}>
                                                                <div>X</div>
                                                            </button>
                                                        </div>)}
                                                </Draggable>
                                            })}
                                        </div>)
                                    }}
                                </Droppable>
                            </div>
                        </div>)
                    })}
                </DragDropContext>
            </div>
        </div>)
}

export default Board
