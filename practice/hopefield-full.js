// 🌱 Big Picture: Hopfield Memory Recall Pipeline
// We want to create a system that can:

// 0) Store multiple patterns (like digits 0, 1, 2) as “memories.”
// Step-0: Representing your images:
// Each image -> small 2D array. Example: 3x3 for simplicity.
// Foreground pixel (digit) = +1, background = -1
// Flatten the 2D array to 1D -> easier for weight calculation.
const memory0 = [
  [1, -1, 1],
  [-1, 1, -1],
  [1, -1, 1]
];

const memory1 = [
  [-1, 1, -1],
  [1, -1, 1],
  [-1, 1, -1]
];

// 1) Take a noisy input , flatten it and identify which stored pattern it’s closest to.
const flattenImage = (noisyImage) => {
    const oneDImage = []
    const rows = noisyImage.length;
    const cols = noisyImage[i].length;

    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            oneDImage.push(noisyImage[i][j])
        }
    }

    return oneDImage
}

const oneDimensionImage = flattenImage(noisyImage);
// Step-1: Hebbian Learning (storing memory)
// Hebbian rule (plain English):

// “Pixels that are ON together become friends, pixels that are different weaken their connection.”
// To do the above one we need to keep track of each members state whether on or off, 

// 🌱 Example: 3 pixels, 1 pattern
// Pattern 𝑝 (a “memory”) = [ +1, -1, +1 ]

// - Pixel 1 = +1
// - Pixel 2 = -1
// - Pixel 3 = +1

// We want to calculate weights 𝑤𝑖𝑗 between every pair of pixels.
// Each weight = “how much pixel i agrees with pixel j” in this memory.


// 2) Correct the noise to recover the original memory.