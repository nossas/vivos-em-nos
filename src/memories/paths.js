const n = (route = '') => `/memory${route}`

export const memory = slug => `/${slug}`
export const memoryCreate = () => n()
export const memoryComments = id => n(`/${id}#comments`)
