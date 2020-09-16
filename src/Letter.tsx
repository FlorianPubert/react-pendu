import React from 'react'

const HIDDEN_LETTER = '_'

interface Props {
    letter: string,
    isVisible: boolean
}

const Letter = (props: Props) => (
    <span className={props.letter.trim() === '' ? 'space' : 'letter'}>
        {props.isVisible ? (props.letter.trim() === '' ? '' : props.letter) : HIDDEN_LETTER}
    </span>
)

export default Letter