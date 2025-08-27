// Step-0: set up memory
console.log("--- STEP-0 ---")
const memory0 = [
    [1, -1, 1],
    [-1, 1, -1],
    [1, -1, 1]
]

const memory1 = [
    [1, 1, 1],
    [1, -1, 1],
    [1, 1, 1]
]

console.log(`Memory 2D-Images: ${memory0}, ${memory1}`);

// Step-1: change each 2d memory image into 1d image (flattening)
console.log("--- STEP-1 ---")
console.log("About to flatten 2D image ==> 1D image, will be used inside the big flattening image once the whole things combined")
// const memories = [memory0, memory1];
const flattenImage = (twoDImage) => {
    let oneDImage = []
    const rows = twoDImage.length;

    for(let i=0; i<rows; i++) {
        for(let j=0; j<twoDImage[i].length; j++) {
            oneDImage.push(twoDImage[i][j])
        }
    }

    return oneDImage;
}

// Step-2: Combine all the 1d images memories into one big memory
console.log("--- STEP-2 ---")
console.log("About to combine all the 1d images memories into one big memory")
const memories = [memory0, memory1];
const combineFlattenedImages = (memories) => {
    const finalOneDImage = [];
    // I could do the forLoop with the map function (but first make it work then, optimize it.)
    for(let i=0; i<memories.length; i++) {
        // iterate through the first 1d image and push it into the final one
        const oneDimensionImage = flattenImage(memories[i]);
        finalOneDImage.push(...oneDimensionImage);
    }

    return finalOneDImage;
}

const bigOneDImageMemory = combineFlattenedImages(memories)
console.log(`The 2D image flattened into a final one big combined image that has all the memories of the previous separated 2D memories, and is now 1D: ${bigOneDImageMemory}`)

// Step-3: Find the Hebbian rule for the big final memory image.
// the weight of a 3x3 image -> when flattened -> becomes 9 elements (so N=9), so rows, columns = N = 9 *in this case
// So N is the length of the 1D image.
// Why NxN?

// Because Hopfield weights are connections between every neuron and every other neuron.
// If you have N neurons, you must store the connection between:

// neuron i and neuron j.
// That’s exactly an N × N matrix.
console.log("--- STEP-3 ---")
const findWeight = (bigOneDImageMemory) => {
    const N = bigOneDImageMemory.length;
    const weight = []

    for(let i=0; i<N; i++) {
        for(let j=0; j<bigOneDImageMemory[i].length; j++) {
            if (i !== j) {
                weight.push(bigOneDImageMemory[i]*bigOneDImageMemory[j])
            }
        }
    }

    // Call the 1D into 2D (NxN matrix) unflattener
    const NxNweightMatrix = unflattenImage(weight, N)

    // Return the 2D NxN matrix that holds the weight of the memories in the images combined.
    return NxNweightMatrix;
}

// const unflattenImage = (weight, N) => {
// // 1️⃣ Decide your 2D shape
// // Usually, images have a natural shape, e.g., MNIST digits are 28×28.
// // - So rows = 28, cols = 28.
// // - Flattened length = 28×28 = 784.
// // If you are using your tiny 3×3 images for testing:
// // - rows = 3
// // - cols = 3
// // - flattened length = 9
//     const elementsInARow = Math.sqrt(N);
//     const row = []
//     let count = 0;
//     let NxNWeightMatrix = [

//     ]

//     weight.map( (element) => {
//         while (weight.length) {
//             if (count <= elementsInARow) {
//                 // push the elements the number of times it's allowed into the row, but since we're mapping it it'll return a copy and the orginal won't be affected, dk if it's going to make a d/ce though.
//                 row.push(element);
//                 count += 1
//             }
//             NxNWeightMatrix.push()
//             count = 0;
//         }
//     })

    const unflattenImage = (oneDArray, N) => {
        const elementsInARow = Math.sqrt(N);
        const row = pushIntoRow(...oneDArray, elementsInARow, N)
        const flattenedArray = pushIntoTwoDArray(row);

        return flattenedArray;
    }

    const pushIntoTwoDArray = (row) => {
        let flattenedArray = []
        flattenedArray.push(row);

        return flattenedArray;
    }

    const pushIntoRow = (data, elementsInARow, N) => {
        let count = 0;
        let row = []
        while (count <= elementsInARow && data.length < N) {
            data.map( (d) => {
                row.push(d)
                count += 1
            })
            count = 0;
        }

        return row;
    }



    // take the square root of the number N and create a rows array, and a normal array (2D) and insert start going in a loop over the numbers in the 1D array with fixed number of times or until the sqrt/N and reset the starting point to be from that point and once the whole lenght of the one-D array is done, add them all to the 2D, or maybe i could have 2D array, and 1D array, the row (i map the 1D array and the copy i push onto the 2D array, and i can keep reusing the 1D array)


// Step-4: Recieve the nosiy input image 2-d, so convert it into one-d or use the 2-d while comparing it with the one big memory
console.log("--- STEP-4 ---")
const finalWeight = findWeight(bigOneDImageMemory);
console.log(finalWeight)