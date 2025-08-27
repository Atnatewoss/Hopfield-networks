const imageX = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
] 

let nosiyImage = [
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 1]
]

const checkNoisyImg = (nosiyImage) => {
    for(let i=0; i<nosiyImage.length; i++) {
        for(let j=0; j<imageX.length; j++) {
            if (nosiyImage[i][j] == imageX[i][j]) {

            }
        }
    }
}