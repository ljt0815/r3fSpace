
function Button({onClick, name}) {
    return <button onClick={onClick} style={{marginRight: 5+'px', }}>{name}</button>
}

export default Button