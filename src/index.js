const makeIpfsFetch = require('ipfs-fetch')

// function get data
function getClaimData(hash) {
    console.log(hash);
    const res = await fetch(hash);
    const text = await res.text();
    console.log(text);
}
// function length of data?

// function total value?

// function