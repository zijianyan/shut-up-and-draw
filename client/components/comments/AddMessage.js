import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <section id="new-message">
        <input name='comment' value={this.state.comment}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.props.addComment(this.state.comment, 'Me')
              this.setState({
                comment: ''
              })
            }
          }}
          onChange={this.handleChange}
        />
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment, author) => {
      dispatch(addComment(comment, author))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddMessage)
