import React from 'react'

import AlertValue from './AlertValue'

export default class Demo extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      changed: false
    }

    this.onChange = this.onChange.bind(this)
    this.timeout = null
    // This value should be just slightly longer than the animation
    this.timeoutDuration = 5000
  }

  componentDidMount() {
    this.timeout = setTimeout(this.onChange, this.timeoutDuration)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  onChange() {
    this.setState({ changed: !this.state.changed })

    this.timeout = setTimeout(this.onChange, this.timeoutDuration)
  }

  render() {
    return (
      <div
        style={{ display: 'flex', flexWrap: 'wrap'}}>
        <AlertValue
          high={3}
          off={0}
          warn={2}
          value={this.getRandomInt(4)}/>
        <AlertValue
          high={3}
          off={0}
          title='Cool Value 1'
          warn={2}
          value={this.getRandomInt(4)}/>
        <AlertValue
          high={3}
          off={0}
          title='Cool Value 2'
          warn={2}
          value={this.getRandomInt(4)}/>
        <AlertValue
          high={3}
          off={0}
          title='Cool Value 3'
          warn={2}
          value={this.getRandomInt(4)}/>
        <AlertValue
          high={40}
          off={0}
          warn={20}
          value={19}/>
      </div>
    )
  }
}
