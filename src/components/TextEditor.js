import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
//import BoldMark from './BoldMark'
import { Button, Icon, Toolbar } from '../components/components'


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
  


export  class TextEditor extends React.Component{

    state = {
        value: initialValue,
    }

    /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor
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
        case 'i': {
          event.preventDefault()
          editor.toggleMark('italic')
          break
        }
        case 'u': {
          event.preventDefault()
          editor.toggleMark('underlined')
          break
        }
        case '`': {
          event.preventDefault()
          editor.toggleMark('code')
          break
        }
        default: {
            return next()
          }

    }
  }

  

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }



    render(editor) {
        return (
          <div>
            <Toolbar>
              {this.renderMarkButton('bold', editor,'format_bold')}
              {this.renderMarkButton('italic',editor, 'format_italic')}
              {this.renderMarkButton('underlined', editor, 'format_underlined')}
              {this.renderMarkButton('code', editor ,'code')}
            </Toolbar>
            <Editor
             ref={this.ref}
             value={this.state.value}
             onChange={this.onChange} 
             onKeyDown={this.onKeyDown}
             renderMark={this.renderMark}
             />
            </div>
        )
    }


    /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, editor,icon) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, editor, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
}

/**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
}


/**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, editor, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
}

}
