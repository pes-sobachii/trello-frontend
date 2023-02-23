export const orderSort = (x, y, sortOrder) => {
    return sortOrder === 'asc' ? x.createdAt.localeCompare(y.createdAt) : y.createdAt.localeCompare(x.createdAt)
}