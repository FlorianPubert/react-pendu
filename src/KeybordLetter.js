import React from 'react'
import PropTypes from 'prop-types'

const KeybordLetter = ({letter, isUsed, isDisabled, onClick}) => (
    <button type="button" className={`btn btn-outline-dark mr-1 mt-1 ${isUsed ? 'used' : ''}`} onClick={() => onClick(letter)} disabled={isDisabled}>
        {letter}
    </button>
)

KeybordLetter.propTypes = {
    letter: PropTypes.string.isRequired,
    isUsed: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default KeybordLetter;