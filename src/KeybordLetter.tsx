import React from 'react'

interface Props {
    letter: string,
    isUsed: boolean,
    isDisabled: boolean,
    onClick: any
}

const KeybordLetter = (props: Props) => (
    <button type="button"
            className={`btn btn-outline-dark mr-1 mt-1 ${props.isUsed ? 'used' : ''}`}
            onClick={() => props.onClick(props.letter)}
            disabled={props.isDisabled}>
        {props.letter}
    </button>
)

export default KeybordLetter;