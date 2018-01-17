import React, { Component } from 'react'
import Link from 'next/link'
import { Menu, Icon, List } from 'antd'

import { withData, gql, graphql } from '../apollo-utils/withData'
import ExperimentListItem from '../components/ExperimentListItem'

class Index extends Component {
  render() {
    const { data } = this.props

    return (
      <div>
        <Menu
          mode="horizontal"
          selectable={false}
          selectedKeys={['experiments']}
          style={{ padding: '0 32px' }}
        >
          <Menu.Item key="experiments">
            <Icon type="dashboard" />Experiments
          </Menu.Item>
        </Menu>
        <div className="listContainer">
          <List
            loading={data.loading}
            dataSource={data.allExperiments}
            renderItem={ExperimentListItem}
          />
        </div>
        <style jsx>{`
          .listContainer {
            margin: 32px;
            background: white;
          }
        `}</style>
      </div>
    )
  }
}

const query = gql`
  query {
    allExperiments {
      name
      id
    }
  }
`

export default withData(graphql(query)(Index))
