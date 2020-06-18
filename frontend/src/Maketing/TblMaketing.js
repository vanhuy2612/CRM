import React, { Component } from "react"
import Board from "@lourenci/react-kanban"
import '@lourenci/react-kanban/dist/styles.css'
import axios from 'axios'
import _ from 'lodash'
import { confirmAlert }  from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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
  async changeStatusMarketing(data) {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URL = process.env.REACT_APP_BASE_URL + '/api/marketing/' + data.id;
    let result = await (axios.put(URL, data))
    let dataRev = _.get(result, "data", [])
    let response = dataRev.message
    console.log('Change Status Marketing:', response)
  }
  async deleteMarketing(id) {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URL = process.env.REACT_APP_BASE_URL + '/api/marketing/delete/' + id;
    let result = await (axios.delete(URL))
    let dataRev = _.get(result, "data", [])
    let response = dataRev.message
    console.log('Delete Status Marketing:', response)
  }
  async detailMarkerting(e){
    console.log("detailMarkerting")
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
            description: element.subject,
            data: element
          })
        }
      })
      // data Doing
      data.map((element, index) => {
        if (element.status == "doing") {
          dataDoing.push({
            id: index,
            title: element.name,
            description: element.subject,
            data: element
          })
        }
      })
      // data Exprired
      data.map((element, index) => {
        if (element.status == "exprired") {
          dataExprired.push({
            id: index,
            title: element.name,
            description: element.subject,
            data: element
          })
        }
      })
      // data Complete
      data.map((element, index) => {
        if (element.status == "complete") {
          dataComplete.push({
            id: index,
            title: element.name,
            description: element.subject,
            data: element
          })
        }
      })
      // data Lose
      data.map((element, index) => {
        if (element.status == "lose") {
          dataLose.push({
            id: index,
            title: element.name,
            description: element.subject,
            data: element
          })
        }
      })
    }
    const board = {
      columns: [
        {
          id: "start",
          title: "Start",
          cards: dataStart
        },
        {
          id: "doing",
          title: 'Doing',
          cards: dataDoing
        },
        {
          id: "exprired",
          title: 'Exprired',
          cards: dataExprired
        },
        {
          id: "complete",
          title: 'Complete',
          cards: dataComplete
        },
        {
          id: "lose",
          title: 'Lose',
          cards: dataLose
        }
      ]
    }
    return (
      <>
        <Board
          // renderCard={({ content }, { removeCard, dragging }) => (
          //   <YourCard dragging={dragging}>
          //     {content}
          //     <button type="button" onClick={this.detailMarkerting(e)}>Detail</button>
          //   </YourCard>
          // )}
          allowRemoveLane
          allowRenameColumn
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={ (board, column, card) => {
            console.log('Remove Card', card)
            
            confirmAlert({
              title: 'Confirm to submit',
              message: 'Are you sure to delete this.',
              buttons: [
                {
                  label: 'confirm',
                  onClick: () => {
                    console.log( card.data.id)
                    this.deleteMarketing(card.data.id)
                  }
                },
                {
                  label: 'cancel',
                  onClick: () => {}
                }
              ]
            });
          }}
          onLaneRename={console.log}
          initialBoard={board}
          allowAddCard={{ on: "top" }}
          onNewCardConfirm={draftCard => ({
            id: new Date().getTime(),
            ...draftCard
          })}
          onCardNew={console.log}
          onCardDragEnd={(board, card, source, destination) => {
            //console.log(destination)
            // Thay đổi status cho marketing:
            let DataChange = {
              id: card.data.id,
              status: destination.toColumnId
            }
            //console.log(DataChange)
            // Update Status of Marketing:
            this.changeStatusMarketing(DataChange);
          }}
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