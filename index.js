
const levenshteinDistance = (str1, str2) => {
    if (str1.length == 0) return str2.length; 
    if (str2.length == 0) return str1.length; 

    // Creates an array of arrays OR 2D matrix with the # of rows and columns = to the length of the string inputs
    // Example for the words: 'him', she' (includes index 0, so we have 4 nulls for a three letter word)
    // [ 
    //  [null, null, null, null],
    //  [null, null, null, null],
    //  [null, null, null, null],
    //  [null, null, null, null]
    // ]
    //
    // Each sub-array represents a column
    // Rows are composed of elements in each column at the same index
    // Randomly populated example:
    // [
    //   [1, 2, 3, 6],  <-- 1st column
    //   [3, 4, 5, 7],  <-- 2nd column
    //   [7, 8, 9, 10]   <-- 3rd column
    // ]
    //
    // Therefore, each Row would be:
    // 1, 3, 7 <-- 1st row
    // 2, 4, 8 <-- 2nd row
    // 3, 5, 9 <-- 3rd row
    // 6, 7, 10 <-- 4th row


    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    // Populate the first column (ie. matrix[0]) with indexes for each character in str1
    // if str1 = 'him' & str2 = 'she'
    // [ 
    //  [0, 1, 2, 3],
    //  [null, null, null, null],
    //  [null, null, null, null]
    // ]
    for (let i = 0; i <= str1.length; i++) {
        matrix[0][i] = i;
    }

    // Populate the first element of each column in the first row with indexes for each character in str2
    // if str1 = 'him' & str2 = 'she'
    // [ 
    //  [0, 1, 2, 3],
    //  [1, null, null, null],
    //  [2, null, null, null],
    //  [3, null, null, null]
    // ]
    for (let j = 0; j <= str2.length; j++) {
        matrix[j][0] = j;
    }
    // console.log(matrix)

    // Loop through second string
    for (let i = 1; i <= str2.length; i++) {

        // Loops through second string
        for (let j = 1; j <= str1.length; j++) {

            // If characters at the same index in both strings match 0 else 1
            const matchValue = str1[i - 1] === str2[j - 1] ? 0 : 1;

            // Update the matrix at the current indexes (col/row) to reflex the smallest value
            // which would mean either a deletion, insertion or a substitution to make the characters equivalent
            matrix[i][j] = Math.min(
                matrix[i][j - 1] + 1, // deletion
                matrix[i - 1][j] + 1, // insertion
                matrix[i - 1][j - 1] + matchValue, // substitution
             );

        }
    }

    return matrix[str2.length][str1.length];

}

// Test
console.log(levenshteinDistance('sitting', 'kitten'))
console.log(levenshteinDistance('sitting', 'htting'))
console.log(levenshteinDistance('sittifdasfasfng', 'kit fdsfaaften'))
console.log(levenshteinDistance('this', 'this'))
console.log(levenshteinDistance('', 'kitten'))
console.log(levenshteinDistance('sitting', ''))
console.log(levenshteinDistance('', ''))
