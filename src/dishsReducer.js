const initialStateDishs = {
  dishs: [],
  error: ''
}

export default function counter(state = initialStateDishs, action={}) {
  switch (action.type) {
    case 'PUSH':
      return Object.assign({}, state, { dishs: state.dishs.concat(action.payload) })
    case 'ERROR':
      return Object.assign({}, state, { error: action.payload })
    default:
      return state
  }
}