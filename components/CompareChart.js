import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'

const colors = ['#ff9c6e', '#a0d911', '#eb2f96', '#722ed1']

class CompareChart extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: props.first }
  }
  render() {
    const { name, id, scalars, onClearCompared } = this.props
    const { visible } = this.state
    const disabled = scalars.length === 0

    const labels = _.range(
      scalars.reduce((p, s) => (s.values.length > p ? s.values.length : p), 0)
    )

    const datasets = scalars.map(({ name, values }, i) => ({
      label: name,
      data: [...values],
      fill: false,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: colors[i]
    }))
    return (
      <div className="container">
        <h3
          onClick={() => this.setState({ visible: !visible && !disabled })}
          className={visible ? 'visible' : disabled ? 'disabled' : ''}
        >
          Compare
        </h3>
        <Icon
          type={`caret-${visible ? 'down' : 'right'}`}
          style={{ float: 'right' }}
          className={disabled ? 'disabled' : ''}
        />
        {visible && (
          <div>
            <Line
              data={{
                labels,
                datasets
              }}
            />
            <Button onClick={onClearCompared}>Clear</Button>
          </div>
        )}
        <style jsx>{`
          h3:hover {
            color: #1890ff;
            cursor: pointer;
          }

          h3.visible {
            color: #1890ff;
          }

          h3 {
            transition: all 0.1s;
            display: inline-block;
          }

          h3.disabled,
          h3.disabled:hover {
            cursor: default;
            color: #ddd;
          }

          .container {
            padding: 12px;
          }

          .disabled {
            color: #ddd;
          }
        `}</style>
      </div>
    )
  }
}
export default CompareChart
