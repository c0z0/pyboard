import React, { Component } from 'react'
import { Icon, Switch } from 'antd'
import { Line } from 'react-chartjs-2'

class ScalarListItem extends Component {
  state = { visible: false, min: false, max: false }
  render() {
    const {
      name,
      id,
      values,
      times,
      onCompareChange,
      compared,
      comparedDisabled
    } = this.props
    const { visible } = this.state
    return (
      <div className="container">
        <h3
          onClick={() => this.setState({ visible: !visible })}
          className={visible ? 'visible' : ''}
        >
          {name}
        </h3>
        <Icon
          type={`caret-${visible ? 'down' : 'right'}`}
          style={{ float: 'right' }}
        />
        {visible && (
          <div>
            <Line
              data={{
                labels: [...times],
                datasets: [
                  {
                    label: name,
                    fill: false,
                    borderColor: '#ff9c6e',
                    backgroundColor: 'rgba(0,0,0,0)',
                    data: [...values]
                  }
                ]
              }}
            />
            <Switch
              onChange={onCompareChange}
              checked={compared}
              disabled={comparedDisabled && !compared}
            />{' '}
            Compare
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

          .container {
            padding: 12px;
          }

          .container:not(:last-child) {
            border-bottom: 1px #ddd solid;
          }
        `}</style>
      </div>
    )
  }
}
export default ScalarListItem
