/* eslint-disable no-restricted-globals */
export const navigate = (path: string) => {
  const hostname = location.hostname
  const fullPath = hostname + path
  location.assign(fullPath)
}
