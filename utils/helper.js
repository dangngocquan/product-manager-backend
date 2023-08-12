function getOffset(currentPage = 1, listPerPage) {
    reuturn (currentPage - 1) * listPerPage;
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}