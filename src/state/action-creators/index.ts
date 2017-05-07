import {
  SET_TUBE_ROUTES,
  SET_TUBE_ROUTES_ERROR
} from '../actions'

function setTubeRoutes(payload: any) {
  return { type: SET_TUBE_ROUTES, payload }
}

function setTubeRoutesError(payload: any) {
  return { type: SET_TUBE_ROUTES_ERROR, payload }
}

export function getTubeRoutes() {
  return (dispatch: any) => {

    let request = new Request('https://api.tfl.gov.uk/line/jubilee/route/sequence/inbound', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json'
      })
    })

    fetch(request)
      .then(response => response.json())
      .then(body => {
        dispatch(setTubeRoutes({
          lines: {
            jubilee: body.stopPointSequences[0].stopPoint
          }
        }))
      })
      .catch(error => {
        dispatch(setTubeRoutesError(error))
      })
  }
}
