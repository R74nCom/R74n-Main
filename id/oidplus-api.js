// https://hosted.oidplus.com/r74n/?goto=other%3AAlpha-M%5Cmain

// REST API
/*
Create
    POST https://hosted.oidplus.com/r74n/rest/v1/objects/[id]
    Input parameters
        ra_email (optional)
        comment (optional)
        iris (optional)
        asn1ids (optional)
        confidential (optional)
        title (optional)
        description (optional)
    Output parameters
        status (<0 is error, >=0 is success)
        status_bits
        error (if an error occurred)
        inserted_id
*/

authKey = "";
// Create a new object at other:Alpha-M\sandboxels with title Sandboxels
// use Authentication: Bearer <authKey> to authenticate
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://hosted.oidplus.com/r74n/rest/v1/objects/other%3AAlpha-M%5Csandboxels');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer ' + authKey);
xhr.onload = function() {
    if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
    }
    else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send(JSON.stringify({
    title: 'Sandboxels',
    ra_email: 'contact@R74n.com'
}));