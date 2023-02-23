const onDragEnd = async (result, listsState, setListsState, cardUpdate) => {
    if (!result.destination) return

    if (result.source.droppableId !== result.destination.droppableId) {

        let targetCard

        let state = listsState.map(item => {
            if (result.source.droppableId === item._id) {
                const initialArray = item.cards
                const resultArray = initialArray.filter(card => card._id !== result.draggableId)
                targetCard = initialArray.find(card => card._id === result.draggableId)
                return {...item, cards: resultArray}
            }
            return item
        })


        state = state.map(item => {
            if (result.destination.droppableId === item._id) {
                const newArray = [...item.cards]
                newArray.push(targetCard)
                return {...item, cards: newArray}
            }
            return item
        })

        setListsState([...state])

        await cardUpdate({
            id: result.draggableId,
            destinationId: result.destination.droppableId,
            sourceId: result.source.droppableId
        })
    }
}

export default onDragEnd