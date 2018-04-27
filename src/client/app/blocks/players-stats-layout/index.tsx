import './players-stats-layout.css'

import PartitionLayout, {
  IPartitionLayoutProps
} from 'client/app/components/partition-layout/partition-layout.component'
import Waiting from 'client/app/components/waiting-ripple/waiting-ripple.componnent'
import { requestAggregation } from 'client/app/state/action-creators/player-stats'
import { STATUS_PLAYER_STATS_RECEIVED } from 'client/app/state/reducers/player-stats/default-state'
import { IAction, IState } from 'client/app/state/store'
import { FREE_THROWS, PlayerHierarchy, THREE_POINTERS, TWO_POINTERS } from 'client/web-workers/player-stats/data-mapper'
import { HierarchyNode } from 'd3'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

export default connect(mapStateToProps, mapDispatchToProps)(playerShotsLayoutContainer)

export interface IPlayersStatsLayoutProps {
  aggregations: PlayerHierarchy
  aggregationChangeHandler: (order: string[]) => void
  className?: string
  status: string
}

/**
 *
 * @param props
 */
function playerShotsLayoutContainer (props: IPlayersStatsLayoutProps) {
  const { aggregations, aggregationChangeHandler, className, status } = props
  const partitionLayoutProps: IPartitionLayoutProps = {
    aggregationChangeHandler,
    aggregations,
    customNodeColourHandler: workOutNodeColour,
    customNodeHtmlHandler: calculateNodeHtml
  }

  const baseClass = 'player-stats-layout'
  const componentClass = className ? `${baseClass} ${className}` : baseClass
  return (
    <div className={componentClass}>
      <PartitionLayout
        {...partitionLayoutProps}
        className='player-stats-layout__layout'
      />
      {status !== STATUS_PLAYER_STATS_RECEIVED && <Waiting />}
    </div>
  )
}

/**
 * Pulls in the aggregations and notification list from the redux state.
 * @param state The redux state
 */
function mapStateToProps (state: IState) {
  const { aggregations, status } = state.playerStats
  return {
    aggregations,
    status
  }
}

/**
 *
 * @param dispatch
 */
function mapDispatchToProps (dispatch: Dispatch<IAction>) {
  return {
    aggregationChangeHandler: (order: string[]) => {
      dispatch(requestAggregation(order))
    }
  }
}

function calculateNodeHtml (d: HierarchyNode<PlayerHierarchy>) {
  const { accumulatedPoints, title } = d.data
  const threePointersTotal = d.data[THREE_POINTERS]
  const twoPointersTotal = d.data[TWO_POINTERS]
  const freeThrowsTotal = d.data[FREE_THROWS]
  const line1 = `<ul class="player-stats-layout__node">`
  const line2 = `<li>${title}</li>`
  const line3 = `<li>total points: ${accumulatedPoints}</li>`
  const line4 = `<li>3 pointers: ${threePointersTotal}</li>`
  const line5 = `<li>2 pointers: ${twoPointersTotal}</li>`
  const line6 = `<li>Free throws: ${freeThrowsTotal}</li>`
  const line7 = `</ul>`
  return line1 + line2 + line3 + line4 + line5 + line6 + line7
}

function workOutNodeColour (d: HierarchyNode<PlayerHierarchy>) {
  return 'purple'
}
