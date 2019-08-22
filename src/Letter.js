import React from 'react'
import PropTypes from 'prop-types'

const HIDDEN_LETTER = '_'

const Letter = ({letter, isVisible}) => (
    <span className={letter.trim() === '' ? 'space' : 'letter'}>
        {isVisible ? (letter.trim() === '' ? '' : letter) : HIDDEN_LETTER}
    </span>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default Letter