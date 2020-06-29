import React, { Component } from 'react'
import Board from 'react-trello'
import axios from 'axios'
import _ from 'lodash'
class BoardTrello extends Component {
    state = {
        dataStart: [],
        dataDoing: [],
        dataComplete: [],
        dataExprired: [],
        dataLose: [],
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
    async detailMarkerting(e) {
        console.log("detailMarkerting")
    }

    setEventBus = (eventBus) => {
        this.setState({ eventBus })
    }

    shouldReceiveNewData = (nextData) => {
        // console.log('New card has been added')
        // console.log(nextData)
    }

    handleCardAdd = (card, laneId) => {
        // console.log(`New card added to lane ${laneId}`)
        // console.dir(card)
    }

    render() {
        const { data, user, urlAvatar } = this.props
        const dataStart = []
        const dataDoing = []
        const dataComplete = []
        const dataExprired = []
        const dataLose = []
        if (data) {
            // data Start
            data.map((element, index) => {
                if (element.status == "start") {
                    dataStart.push({
                        id: element.id,
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
                        id: element.id,
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
                        id: element.id,
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
                        id: element.id,
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
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
        }
        const board = {
            lanes: [
                {
                    id: "start",
                    title: "Start",
                    label: '2/2',
                    cards: dataStart
                },
                {
                    id: "doing",
                    title: 'Doing',
                    label: '2/2',
                    cards: dataDoing
                },
                {
                    id: "exprired",
                    title: 'Exprired',
                    label: '2/2',
                    cards: dataExprired
                },
                {
                    id: "complete",
                    title: 'Complete',
                    label: '2/2',
                    cards: dataComplete
                },
                {
                    id: "lose",
                    title: 'Lose',
                    label: '2/2',
                    cards: dataLose
                }
            ]
        }
        return (
            <Board
                editable
                onCardAdd={this.handleCardAdd}
                data={board}
                draggable
                onDataChange={this.shouldReceiveNewData}
                eventBusHandle={this.setEventBus}
                // handleDragStart={handleDragStart}
                handleDragEnd={(cardId, sourceLaneId, targetLaneId) => {
                    let DataChange = {
                        id: cardId,                      
                        status: targetLaneId
                    }
                    console.log(DataChange)
                    // Update Status of Marketing:
                    this.changeStatusMarketing(DataChange);
                }}
                onCardClick={
                    (cardId, metadata, laneId) => {
                        console.log("cardId",cardId)
                        console.log("metadata", metadata)
                        console.log("laneId", laneId)
                        this.props.link.history.push({
                            pathname: `/MarketingDetail/${cardId}`,
                            state: {user: user, 
                                urlAvatar: urlAvatar 
                            },
                        })
                    }
                }
                onCardDelete = {
                    (cardId, laneId) => {
                        this.deleteMarketing(cardId)
                    }
                }
            />
        )
    }
}
export default BoardTrello