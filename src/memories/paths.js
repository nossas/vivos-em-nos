const n = (route = '') => `/memory${route}`

export const memoriesList = () => n('/list')
export const memory = slug => `/${slug}`
export const memoryCreate = () => n()
export const memoryComments = slug => `/${slug}#comments`
