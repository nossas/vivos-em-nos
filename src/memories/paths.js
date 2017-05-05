const n = (route = '') => `/memory${route}`

export const memory = id => n(`/${id}`)
export const memoryCreate = () => n()
export const memoryComments = id => n(`/${id}#comments`)
