import React, { Component } from 'react'
import { Menu, Icon, Layout, List } from 'antd'

import { withData, gql, graphql } from '../apollo-utils/withData'
import ScalarListItem from '../components/ScalarListItem'
import CompareChart from '../components/CompareChart'

class Experiment extends Component {
  state = { comparedScalarsId: {} }
  render() {
    const { data } = this.props
    const { comparedScalarsId } = this.state
    const { experiment } = data

    const comparedScalars = data.loading
      ? []
      : experiment.scalars.filter(s => comparedScalarsId[s.id])
    return (
      <div>
        <div>
          <Menu
            mode="horizontal"
            selectable={false}
            style={{ padding: '0 32px' }}
            onClick={({ key }) => this.props.url.push('/')}
          >
            <Menu.Item key="experiments">
              <Icon type="dashboard" />Experiments
            </Menu.Item>
          </Menu>
          <Layout>
            <Layout.Sider
              width={256}
              style={{ background: '#fff', height: '100vh' }}
            >
              <h3>{!data.loading ? experiment.name : ''}</h3>
              <Menu mode="inline" defaultSelectedKeys={['scalars']}>
                <Menu.Item key="scalars">
                  <Icon type="line-chart" />
                  Scalars
                </Menu.Item>
              </Menu>
            </Layout.Sider>
            <Layout.Content>
              <div className="listContainer">
                <CompareChart
                  scalars={comparedScalars}
                  onClearCompared={() =>
                    this.setState({ comparedScalarsId: {} })
                  }
                />
                <List
                  style={{ background: '#fff' }}
                  bordered
                  loading={data.loading}
                  dataSource={!data.loading ? experiment.scalars : []}
                  renderItem={s => (
                    <ScalarListItem
                      {...s}
                      compared={comparedScalarsId[s.id]}
                      comparedDisabled={
                        Object.keys(comparedScalarsId).filter(
                          k => comparedScalarsId[k]
                        ).length >= 4
                      }
                      onCompareChange={v => {
                        comparedScalarsId[s.id] = v
                        this.setState({ comparedScalarsId })
                      }}
                    />
                  )}
                />
              </div>
            </Layout.Content>
          </Layout>
          <style jsx>{`
            .listContainer {
              margin: 32px;
              display: block;
            }
            h3 {
              margin: 12px 24px;
            }
          `}</style>
        </div>
      </div>
    )
  }
}

const query = gql`
  query experiment($id: ID!) {
    experiment(id: $id) {
      name
      scalars {
        name
        values
        times
        id
      }
    }
  }
`

export default withData(
  graphql(query, {
    options: ({ url: { query: { id } } }) => ({
      variables: { id },
      pollInterval: 10 * 1000
    })
  })(Experiment)
)
