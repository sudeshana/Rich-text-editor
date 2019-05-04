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
          <div>
            <Toolbar>
              {this.renderMarkButton('bold', 'format_bold')}
              {this.renderMarkButton('italic', 'format_italic')}
              {this.renderMarkButton('underlined', 'format_underlined')}
              {this.renderMarkButton('code', 'code')}
              {this.renderBlockButton('heading-one', 'looks_one')}
              {this.renderBlockButton('heading-two', 'looks_two')}
              {this.renderBlockButton('block-quote', 'format_quote')}
              {this.renderBlockButton('numbered-list', 'format_list_numbered')}
              {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            </Toolbar>
            <Editor

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

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
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

renderBlockButton = (type, icon) => {
  let isActive = this.hasBlock(type)

  if (['numbered-list', 'bulleted-list'].includes(type)) {
    const { value: { document, blocks } } = this.state

    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key)
      isActive = this.hasBlock('list-item') && parent && parent.type === type
    }
  }

  return (
    <Button
      active={isActive}
      onMouseDown={event => this.onClickBlock(event, type)}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
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


}
