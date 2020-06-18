import React, { Component } from "react"
import Board from "@lourenci/react-kanban"
import '@lourenci/react-kanban/dist/styles.css'

class DragAndDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataStart: [],
      dataDoing: [],
      dataExprired: [],
      dataComplete: [],
      dataLose: []
    }
  }
  render() {
    const { data } = this.props
    const { dataStart, dataDoing, dataComplete, dataExprired, dataLose } = this.state
    if (data) {
      // data Start
      data.map((element, index) => {
        if (element.status == "start") {
          dataStart.push({
            id: index,
            title: element.name,
            description: element.contents
          })
        }
      })
      // data Doing
      data.map((element, index) => {
        if (element.status == "doing") {
          dataDoing.push({
            id: index,
            title: element.name,
            description: element.contents
          })
        }
      })
      // data Exprired
      data.map((element, index) => {
        if (element.status == "exprired") {
          dataExprired.push({
            id: index,
            title: element.name,
            description: element.contents
          })
        }
      })
      // data Complete
      data.map((element, index) => {
        if (element.status == "complete") {
          dataComplete.push({
            id: index,
            title: element.name,
            description: element.contents
          })
        }
      })
      // data Lose
      data.map((element, index) => {
        if (element.status == "lose") {
          dataLose.push({
            id: index,
            title: element.name,
            description: element.contents
          })
        }
      })
    }
    const board = {
      columns: [
        {
          id: 1,
          title: "Start",
          cards: dataStart
        },
        {
          id: 2,
          title: 'Doing',
          cards: dataDoing
        },
        {
          id: 3,
          title: 'Exprired',
          cards: dataExprired
        },
        {
          id: 4,
          title: 'Complete',
          cards: dataComplete
        },
        {
          id: 5,
          title: 'Lose',
          cards: dataLose
        }
      ]
    }
    return (
      <>
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
      // <Board
      //   renderCard={({ cards }, { removeCard, dragging }) => (
      //     <YourCard dragging={dragging}>
      //       {cards}
      //       <button type="button" onClick={removeCard}>Remove Card</button>
      //     </YourCard>
      //   )}
      // >
      //   {board}
      // </Board>
    );
  }
}
export default DragAndDrop