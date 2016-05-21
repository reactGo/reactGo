import { NETWORK_EXCEPTION } from '../types/message';

export function request(type, data) {
  return {
    types: [type, `${type}_SUCCESS`, NETWORK_EXCEPTION],
    payload: {
      request: data
    }
  }
}
