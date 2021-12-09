const makeIpfsFetch = require('ipfs-fetch')

// Claim Parameters
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

// function get data
function getClaimData(hash) {
    console.log(hash);
    try {
        // get data from IPFS/ Infura
        const res = await fetch(hash);
        const text = await res.text();
        console.log(text);
        let splitSpace = text.split('\n')

        // fill claim parameters
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
        let purityWhole = splitSpace[9].split(":")[1]
        let pure = purityWhole.split(",")
        for (let i = 0; i < pure.length; i++) {
            let element = pure[i].split(")")[0] + ")";
            let percent = pure[i].split(")")[1]
            purity[element] = percent;
        }
        console.log("Purity: ", purity)
        //certification
        let certWhole = splitSpace[11].split(":")[1];
        let cert = certWhole.split(" ");
        let certNum = cert[cert.length - 1];
        let certName;
        if (cert[cert.length - 2]) {
            let certName3 = cert[cert.length - 2];
            certName = certName3;
        }
        if (cert[cert.length - 3]) {
            let certName2 = cert[cert.length - 3];
            if (certName2) {
                certName = certName2 + " " + certName;
            }
        }
        if (cert[cert.length - 4]) {
            let certName1 = cert[cert.length - 4];
            if (certName1) {
                certName = certName1 + " " + certName;
            }
        }
        certification[certName] = certNum
        //creator location
        creatorLocation = splitSpace[13].split(":")[1]
        console.log("Creator Location: ", creatorLocation)
        //image
        image = splitSpace[15].split(":")[2]
        console.log("Image: ", "https:" + image)
        //timestamp
        console.log("Timestamp: ", splitSpace[17].split(":")[1] + ":" + splitSpace[17].split(":")[2] + ":" + splitSpace[17].split(":")[3])
        //minesite directives
        if (splitSpace[20]) {
            supportDirectives[1] = splitSpace[20].split("          ")[1]
        }
        if (splitSpace[21]) {
            supportDirectives[2] = splitSpace[21].split("          ")[1]
        }
        if (splitSpace[22]) {
            supportDirectives[3] = splitSpace[22].split("          ")[1]
        }
        console.log("Support Directives: ", supportDirectives)
        //wallet addresses
        if (splitSpace[25]) {
            let name1 = splitSpace[25].split(":")[0];
            let name1S = name1.split("          ")[1];
            let address1 = splitSpace[25].split(":")[1];
            associatedAddresses[name1S] = address1
        }
        if (splitSpace[26]) {
            let name2 = splitSpace[26].split(":")[0];
            let name2S = name2.split("         ")[1];
            let address2 = splitSpace[26].split(":")[1];
            associatedAddresses[name2S] = address2
        }
        if (splitSpace[27]) {
            let name3 = splitSpace[27].split(":")[0];
            let name3S = name3.split("         ")[1];
            let address3 = splitSpace[27].split(":")[1];
            associatedAddresses[name3S] = address3
        }
        console.log("Addresses Attached to Claim: ", associatedAddresses)
        console.log("\n");

    } catch (e) {
        console.error(e)
    }


}

// function length of data?

// function total value?

// function