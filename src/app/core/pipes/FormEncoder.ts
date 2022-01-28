export const getFormUrlEncoded = (toConvert: any) => {
    var formBody = [];
    for (var property in toConvert) {
        var encodedKey = property;
        var encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}