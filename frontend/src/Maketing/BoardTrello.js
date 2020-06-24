// import './App.css'

import React, { Component } from 'react'
import Board from 'react-trello'
import axios from 'axios'
import _ from 'lodash'
import { confirmAlert }  from 'react-confirm-alert';


// const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
    // console.log('drag started')
    // console.log(`cardId: ${cardId}`)
    // console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    // console.log('drag ended')
    // console.log(`cardId: ${cardId}`)
    // console.log(`sourceLaneId: ${sourceLaneId}`)
    // console.log(`targetLaneId: ${targetLaneId}`)
}

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
        window.location.reload()
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

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {
                id: 'Milk',
                title: 'Buy Milk',
                label: '15 mins',
                description: 'Use Headspace app',
            },
        })
        this.state.eventBus.publish({
            type: 'REMOVE_CARD',
            laneId: 'PLANNED',
            cardId: 'Milk',
        })
    }

    addCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'BLOCKED',
            card: {
                id: 'Ec2Error',
                title: 'EC2 Instance Down',
                label: '30 mins',
                description: 'Main EC2 instance down',
            },
        })
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
        const { data } = this.props
        const { dataStart, dataDoing, dataComplete, dataExprired, dataLose } = this.state
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
                handleDragStart={handleDragStart}
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
                        this.props.link.history.push(`/MarketingDetail/${cardId}`)
                    }
                }
            />
        )
    }
}
export default BoardTrello