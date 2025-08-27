const array = [1,-1,1,-1,-1,1,-1,1];

const weight = (array) => {
    let weights = []
    for(let i=0;i<array.length; i++) {
        for(let j=0; j<array.length; j++) {
            if (i !== j) {
                if((array[i] * array[j]) > 0) {
                    weights.push(array[i]*array[j])
                } else {
                    weights.push(array[i]*array[j])
                }
            }
        }
    }
    console.log([`Result: ${weights}, length: ${weights.length}`])
}

weight(array);