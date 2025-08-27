// Step-0: Have a memory for the images (that we'll compare or use as a reference)
const memory0 = [
    [1, -1, 1],
    [-1, 1, -1],
    [1, -1, 1]
]

const memory1= [
    [1, 1, 1],
    [1, -1, 1],
    [1, 1, 1]
]

// Step-1: recieve a nosiy 2D-image
const noisyImage = [
    [1, 1, 1],
    [1, 1, -1],
    [1, 1, 1]
]
console.log("--- STEP-0 ---")
console.log(`Noisy Image: ${noisyImage}`)

console.log("--- STEP-1 ---")
console.log("About to flatten the 2d image into 1d")
// then: flatten it (convert from 2d-1d)
const flattenImage = (noisyImage) => {
    let oneDimensionalArray = []
    let rows = noisyImage.length

    for(let i=0; i<rows; i++) {
        for(let j=0; j<noisyImage[i].length; j++) {
            oneDimensionalArray.push(noisyImage[i][j])
        }
    }

    return oneDimensionalArray
}

const oneDImage = flattenImage(noisyImage);
console.log(`Flattened 1d image: ${oneDImage}`)

console.log("--- STEP-2 ---")
console.log("Finding out the hebbian-rule weight of the 1-D image, (basically the relation ship in weight it has with the other elements")
// find out the hebbian-rule weight, and represent it in an NxN matrix
const findWeight = (oneDImage) => {
    let NxNWeights = []
    for(let i=0; i<oneDImage.length; i++) {
        for(let j=0; j<oneDImage.length; j++) {
            if (i !== j) {
                // if ((oneDImage[i] * oneDImage[j]) > 0) {
                //     NxNWeights.push(oneDImage[i] * oneDImage[j])
                // } else {
                //     NxNWeights.push(oneDImage[i] * oneDImage[j])
                // }
                NxNWeights.push(oneDImage[i] * oneDImage[j])
            }
        }
    }

    return NxNWeights;
}

const hebbianWeight = findWeight(oneDImage);
console.log(`Hebbian-Weight: ${hebbianWeight}`);