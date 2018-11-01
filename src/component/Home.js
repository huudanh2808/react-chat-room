import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

const Home = ({ auth }) => (
    <div>
        <nav className={"navbar navbar-dark bg-dark justify-content-between"}>
            <div className={"navbar-brand"}>Wonder space</div>
            <div className={"user-name"}>{"Hello " + auth.displayName}</div>
        </nav>
        <div className={"fluid-container"}>
            <div className={"content"}>In developing</div>
            <div className={"content"}>Comming soon</div>
        </div>
    </div>

)
export default compose(
    connect(({ firebase: { auth } }) => ({ auth }))
)(Home)