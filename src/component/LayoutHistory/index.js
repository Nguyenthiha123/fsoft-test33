import React from 'react'
import PropTypes from 'prop-types'
import VerifyHistory from '../VerifyHistory'
import RecognizeHistory from '../RecognizeHistory'

const LayoutHistory = props => {
    return (
        <div className='container'>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a style={{ position: 'relative', left: '400px', color: "#495057" }} className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Verify History</a>
                    <a style={{ color: "#495057", position: 'relative', left: '400px' }} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Recognize History</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <VerifyHistory />
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <RecognizeHistory />
                </div>

            </div>
        </div>
    )
}

LayoutHistory.propTypes = {

}

export default LayoutHistory
