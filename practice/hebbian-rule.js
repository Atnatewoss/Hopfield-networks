const array = [1,-1,1,-1,-1,1,-1,1];

const weight = (array) => {
    let weights = []
    for(let i=0;i<array.length; i++) {
        for(let j=i+1; j<array.length; j++) {
        // Here change the 'j=i+1' into a 'j<0' : Loops over all pairs (i, j) where j > i (upper triangle only)

// Checks array[i] * array[j]: 0 → '+', < 0 → '-'
// - Pushes to weights array and logs

// ✅ This works as a quick check of agreement/disagreement, but:
// You don’t get a full matrix (needed for the Hopfield update later)
// You lose the magnitude (numeric weight) — sometimes useful if summing multiple patterns
            console.log(`comparing ${i}th value with ${j}th value: ${array[i]}, ${array[j]}`)
            if((array[i] * array[j]) > 0) {
                weights.push('+')
                console.log(`CHECK: PASSED-Positive Result got from multiplying ${array[i]} and ${array[j]}.`)
            } else {
                console.log(`CHECK: Didn't pass negative Result got from multiplying ${array[i]} and ${array[j]}.`)
                weights.push('-')
            }
        }
    }
    return [`Result: ${weights}`]
}

const result = weight(array);
console.log(result)