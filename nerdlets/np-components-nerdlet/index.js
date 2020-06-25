import React from 'react'
import { Tabs, TabsItem } from 'nr1'
import AlertValuesDemo from '../../components/AlertValue/demo'

export default class CustomComponents extends React.Component {
  render() {
    return (
      <Tabs defaultValue="tab-1">
        <TabsItem value="tab-1" label="Conditionals">
          <AlertValuesDemo />
        </TabsItem>
      </Tabs>
    )
  }
}
