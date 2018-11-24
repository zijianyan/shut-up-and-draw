import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'

import CanvasDraw from 'react-canvas-draw'

class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    const {user, game, gameId} = this.props
    this.state = {
      user: user ? user : {},
      game: game ? game : {},
      gameId: gameId ? gameId : ''
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getSubmissions({id: this.state.gameId})
  }


  handleClear() {
    this.canvasRef.clear();
  }

  handleSubmit() {
    const base64 = this.canvasRef.canvas.drawing.toDataURL();
    const submission = {
      type: 'drawing',
      gameId: this.props.match.params.gameId*1,
      base64
    }
    this.props.createSubmission(submission)
  }

  render(){
    const { handleClear, handleSubmit } = this;
    const {submissions} = this.props


    return (
      <Fragment>
        <h1>
          DRAW! { submissions.length > 0 ? submissions[0].phrase : null}
        </h1>
        <CanvasDraw
          ref={(node)=> {this.canvasRef = node}} // now this component has a .canvas property which references this element
          loadTimeOffset={5}
          lazyRadius={0}
          brushRadius={5}
          brushColor="#222"
          catenaryColor="#222"
          gridColor="rgba(150,150,150,0.17)"
          hideGrid={true}
          canvasWidth={400}
          canvasHeight={400}
          disabled={false}
        />
        <button
          onClick={handleClear}
          type="submit"
          >
          Clear
          </button>
        <button
          onClick={handleSubmit}
          type="submit"
          >
          Submit (console logs for now)
          </button>
      </Fragment>
    )
  }
}

const mapStateToProps = ( {games, user, submissions}, { match }) => {
  const currentGame = games.find(x => x.id === match.params.gameId * 1)
  console.log(currentGame)
  return {
    gameId: match.params.gameId,
    user,
    submissions,
    game: currentGame
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission)
