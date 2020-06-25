import React from 'react'
import PropTypes from 'prop-types'
import {
  createMutableProperty as cmp,
  getDuration as gd } from '../../common/utils'

export default class AlertValue extends React.PureComponent {
  constructor() {
    super(...arguments)

    this.state = {
      changed: false,
      level: 'off',
      title: null,
      value: 0
    }

    this.evalRef = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.timeout = null

    // The duration will be determined by the CSS value of 'low animate' if available
    this.timeoutDuration = 3100
  }

  componentDidUpdate() {
    this.manageChange()
  }

  componentDidMount() {
    this.getAnimationDuration()

    this.manageChange()
  }

  static evaluateState(props, state) {
    let ret = null

    if (props.value !== state.value) {
      ret = {}
      let ul = this.getState(props)

      if (ul !== state.level) {
        cmp(ret, 'level', ul)
      }

      cmp(ret, 'value', props.value !== undefined ? props.value : state.value)
    }

    if (props.title != null && props.title !== state.level) {
      if (ret === null) {
        ret = {}
      }

      cmp(ret, 'title', props.title)
    }

    if (ret !== null) {
      cmp(ret, 'changed', true)
    }

    return ret
  }

  componentWillUnmount() {
    if (this.timeout != null) {
      clearTimeout(this.timeout)
    }
  }

  getAnimationDuration() {
    this.evalRef.current.className = 'low animate'

    const dur = gd(window.getComputedStyle(this.evalRef.current).getPropertyValue('animation-duration'))

    // Ensure that there is a default duration if the CSS value cannot be found
    if (0 <= dur) {
      // add an additional 100ms to support any potential delays
      this.timeoutDuration = dur + 100
      console.log(this.timeoutDuration)
    }
  }

  static getState(props) {
    let cn = 'low'

    if (props !== undefined) {
      if (props.warn != null && props.value >= props.warn) {
        cn = 'warn'
      }

      if (props.high != null && props.value >= props.high) {
        cn = 'high'
      }

      if ((props.off != null && props.value <= props.off) ||
        (props.warn == null && props.high == null)) {
        cn = 'off'
      }
    } else {
      cn = 'off'
    }

    return cn
  }

  manageChange() {
    let su = AlertValue.evaluateState(this.props, this.state)

    if (su != null) {
      if (this.timeout != null) {
        clearTimeout(this.timeout)
      }

      this.setState(su)

      this.timeout = setTimeout(this.onChange, this.timeoutDuration)
    }
  }

  onChange() {
    this.setState({ changed: false })
  }

  render() {
    const level = this.state.changed ? this.state.level + ' animate' : this.state.level
    return (
      <div
        className='alert-value'>
          <div
            className='alert-value-group'>
            {this.state.title !== null &&
            <div
              className={`title ${level}`}>
                {this.state.title}
            </div>
            }
            <div
              className={`value ${level}`}>
                {this.state.value}
            </div>
        </div>
        { this.timeoutDuration === 3100 &&
        <div ref={this.evalRef}></div>
        }
      </div>
    )
  }
}

AlertValue.propTypes = {
  high: PropTypes.number,
  off: PropTypes.number,
  value: PropTypes.number,
  warn: PropTypes.number
}
