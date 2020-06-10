import React, { Component } from "react"
import Board from "@lourenci/react-kanban"
import '@lourenci/react-kanban/dist/styles.css'

const board = {
    columns: [
        {
            id: 1,
            title: "Start",
            cards: [
                {
                    id: 1,
                    title: "Card title 1",
                    description: "Card content"
                },
                {
                    id: 2,
                    title: "Card title 2",
                    description: "Card content"
                },
                {
                    id: 3,
                    title: "Card title 3",
                    description: "Card content"
                }
            ]
        },
        {
            id: 2,
            title: "Doing",
            cards: [
                {
                    id: 9,
                    title: "Card title 9",
                    description: "Card content"
                }
            ]
        },
        {
            id: 3,
            title: "Status",
            cards: [
                {
                    id: 10,
                    title: "Card title 10",
                    description: "Card content"
                },
                {
                    id: 11,
                    title: "Card title 11",
                    description: "Card content"
                }
            ]
        },
        {
            id: 4,
            title: "SuccessFully",
            cards: [
                {
                    id: 12,
                    title: "Card title 12",
                    description: "Card content"
                },
                {
                    id: 13,
                    title: "Card title 13",
                    description: "Card content"
                }
            ]
        }
    ]
};
class DragAndDrop extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <>
                <h2>Example of an uncontrolled board</h2>
                <Board
                    allowRemoveLane
                    allowRenameColumn
                    allowRemoveCard
                    onLaneRemove={console.log}
                    onCardRemove={console.log}
                    onLaneRename={console.log}
                    initialBoard={board}
                    allowAddCard={{ on: "top" }}
                    onNewCardConfirm={draftCard => ({
                        id: new Date().getTime(),
                        ...draftCard
                    })}
                    onCardNew={console.log}
                />
            </>
        );
    }
}
export default DragAndDrop