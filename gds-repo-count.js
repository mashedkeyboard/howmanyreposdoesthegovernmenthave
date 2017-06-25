var orglist = ['alphagov', 'gds-operations', 'gds-attic'];
var repocounts = [];
var urlbase = 'https://api.github.com/orgs/';
var repoCounter = document.getElementById("count");
var orgsIncluded = document.getElementById("orgsIncluded");

orgsIncluded.innerHTML = "Includes ";
repoCounter.innerHTML = "Loading...";
repoCounter.className = "big";

for (var org in orglist) {
    var isLast = (org == (orglist.length - 1));
    if (org != 0 && !isLast) {
        orgsIncluded.innerHTML += ', ';
    } else if (isLast) {
        orgsIncluded.innerHTML += ' and ';
    }
    orgsIncluded.innerHTML += '<a href="https://github.com/' + orglist[org] + '">' + orglist[org] + '</a>';
    callApi(urlbase + orglist[org], setCount);
}
waitForCount();

function callApi(url, fnc) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            fnc(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function setCount(response) {
    ghrs = JSON.parse(response);
    repocounts.push(ghrs.public_repos);
}

function waitForCount() {
    if (orglist.length == repocounts.length) {
        setResponse();
    } else {
        setTimeout(waitForCount, 100);
    }
}

function setResponse() {
    var repocount = 0;
    for (var count in repocounts) {
        repocount += repocounts[count];
    }
    repoCounter.innerHTML = repocount;
}
