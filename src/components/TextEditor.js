import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
//import BoldMark from './BoldMark'


// Create our initial value...
const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  })

  function BoldMark(props) {
    return <strong>{props.children}</strong>
  }
  


export  class TextEditor extends Component{

    state = {
        value: initialValue,
    }

    onChange = ({value}) =>{
        this.setState({value})
    }

    // Define a new handler which prints the key that was pressed.
  onKeyDown = (event, editor, next) => {
    
    if (!event.ctrlKey) return next()
    event.preventDefault()

    switch (event.key) {
        // When "B" is pressed, add a "bold" mark to the text.
        case 'b': {
          event.preventDefault()
          editor.toggleMark('bold')
          break
        }
        default: {
            return next()
          }

    }
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }


    render() {
        return (
            <Editor

             value={this.state.value}
             onChange={this.onChange} 
             onKeyDown={this.onKeyDown}
             renderMark={this.renderMark}
             />
        )
    }
}
