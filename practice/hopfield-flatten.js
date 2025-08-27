
const flatten= (twoDimenstionImage) => {
    let oneDArray = []

    for (let i =0; i<twoDimenstionImage.length; i++) { //rows
        for (let j=0; j<twoDimenstionImage[i].length; j++) { //columns of row i
            oneDArray.push(twoDimenstionImage[i][j]);
        }
    }

    return oneDArray
}

const twoDImg = [
    [-1, 1, -1],
    [1, -1, 1],
    [-1, 1, -1]
]

const oneDimenstionArray = flatten(twoDImg)
console.log(oneDimenstionArray);