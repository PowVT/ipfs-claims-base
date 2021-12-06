import fetch from 'node-fetch';
import test from 'tape';

// test claims
let correctHash = 'QmeMsKNL8kecNP8oxifmYYT9oN6tbTV8awpuRos11Th3Zy';
let incorrectHash;

// test 1
test('Load a file from the CID and log result:', async function (t) {
    let commodity;
    let prodID;
    let mass;
    let purity;
    let certification;
    let creatorLocation;
    let image;
    let timestamp;
    let supportDirectives;
    let associatedAddresses;

    try {
        const response = await fetch('https://ipfs.infura.io:5001/api/v0/cat?arg=' + correctHash)
        const text = await response.text()
        let splitSpace = text.split('\n')

        console.log("\n");
        //commodity
        commodity = splitSpace[3].split(":")[1]
        console.log("Commodity: ", commodity)
        //productID
        prodID = splitSpace[5].split(":")[1].valueOf();
        console.log("ProductID: ", prodID)
        //mass
        mass = splitSpace[7].split(":")[1].valueOf();
        console.log("Mass: ", mass)
        //purity
        console.log("Purity: ", splitSpace[9].split(":")[1])
        console.log("certification: ", splitSpace[11].split(":")[1])
        console.log("creatorLocation: ", splitSpace[13].split(":")[1])
        console.log("image: ", "https:" + splitSpace[15].split(":")[2])
        console.log("timestamp: ", splitSpace[17].split(":")[1])
        console.log("supportDirectives: ", splitSpace[20], splitSpace[21], splitSpace[22])
        console.log("associatedAddresses: ", splitSpace[25], splitSpace[26], splitSpace[27])
        console.log("\n");

        // fetch response
        t.ok(response, 'Got a response object.')
        t.equal(response.status, 200, 'Got status 200 in fetch response.')

        // mass greater than 0
        t.ok(Number(mass) > 0, 'Mass is greater than 0.')

    } catch (e) {
        console.error(e)
    }

})
