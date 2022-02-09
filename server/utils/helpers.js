const convertJoiErrorToArray = (string) => {
    const arr = string.replaceAll(/"/g, '').split('.');
    return arr;
}

module.exports = { convertJoiErrorToArray }