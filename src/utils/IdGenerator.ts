const generateId = (ids) => {
    if (ids.length === 0) {
        return 1;
    } else {
        return Math.max(...ids) + 1;
    }
}

export default generateId;