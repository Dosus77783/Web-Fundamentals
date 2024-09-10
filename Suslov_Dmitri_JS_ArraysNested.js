

// Generates a random X/Y coordinate array from -50 to 50 example: [-32,5]
function generateArray(arrayLength = 2, elemSize = 50, lengthMin = 2, elemMin = -50){
    let length = Math.floor((Math.random() * (arrayLength - lengthMin)) + lengthMin)
    var array= [];
    for(let i = 0; i < length; i++){
        array.push(Math.floor(Math.random() * ((elemSize+1) - elemMin) + elemMin))
    }
    //console.log("Generated Array:", array);
    return array;
}  

// Generates a random array of arrays (a 2D array), with a parameter that takes a number argument for the maximum length of the 2D array. Minimum size of the array is 1.
function generate2DCoords(arrayMaxLength){
    let arr = [];
    let length = Math.floor(Math.random() * arrayMaxLength + 1);
    for(let i = 0; i<length; i++){
        arr.push(generateArray());
    }
    console.log("Customer Coordinates:", arr);
    return arr;
}

// Sorts the coordinates of a 2D array. Takes 2 parameters, the 2D array and a string literal argument for the coordinates of either x or y. Defaults to y if its anything but 'x'.
function sortCoords(array, coordXOrY){
    const coordinate = coordXOrY == "x" ? 0 : 1;
    if(array.length == 1){ return [array[0][coordinate]];}
    
    let sortedArray = [];
    let temp = 0;
    let repeat = false;

    do {
        repeat = false;
        for(let i = 0; i<array.length-1; i++){
            if (array[i][coordinate] > array[i+1][coordinate]){
                temp = array[i+1][coordinate];
                array[i+1][coordinate] = array[i][coordinate];
                array[i][coordinate] = temp;
                repeat = true;
            }
        }
    }
    while(repeat)

    for(let i = 0; i<array.length; i++){
        sortedArray[i] = array[i][coordinate];
    }
    console.log(`${coordXOrY}`, sortedArray)
    return sortedArray;
}

// Finds the optimal spot for the Taco Truck by sorting both the x and y coordinates of the customer, then finding the median of both. The final coordinate is the result.
function optimalSpot(arr){
    finalCoords = [];
    // Quick test to see if there is only 1 array in the 2D array
    if(arr.length == 1){
        finalCoords.push(arr[0][0],arr[0][1]);
        return finalCoords;
    }

    // Are there an even amount of Coordinates in the array or Odd?
    evenNotOdd = arr.length % 2 == 0 ? true : false;
    xCoords = sortCoords(arr, "x");
    yCoords = sortCoords(arr, "y");
    
    //Finding the Median, [0] and [1] are X and Y respectably.
    if(evenNotOdd){
        // If its an even amount of coordinates, we find the middle 2 coordinates, add the values together, then divide them by 2.
        finalCoords[0] = (xCoords[(arr.length/2)-1] + xCoords[arr.length/2])/2;
        finalCoords[1] = (yCoords[(arr.length/2)-1] + yCoords[arr.length/2])/2;
    }else{
        // If its an odd amount of coords, we find the middle by dividing the length of the array by 2, then flooring the result to get the correct index and its value.
        finalCoords[0] = xCoords[Math.floor(arr.length/2)];
        finalCoords[1] = yCoords[Math.floor(arr.length/2)];
    }

    return finalCoords;
}

console.log("The Optimal Spot to Park the Taco Truck is:", optimalSpot(generate2DCoords(10)));

/*
example

x1[ -30, -3 ],
x2[ 3, 16 ],
x3[ 31, 18 ],
x4[ 37, -15 ],
x5[ 28, -32 ],
x6[ -5, 49 ],
x7[ 8, 16 ],
x8[ -36, 4 ]

x [-36, -30, -5,  3, 8,  28, 31, 37]
y [-32, -15, -3,  4, 16,  16, 18, 49]

Optimal Spot Generated: T = [ 5.5, 10 ]
                           y
50 +--------------------------------------------------+
   |                    x6 .                          |
40 |                       .                          |
   |                       .                          |
30 |                       .                          |
   |                       .                          |
20 |                       .                  x3      |
   |                       .x2 x7                     |
10 |                       .  T                       |
   |     x8                .                          |
0  +--------------------------------------------------+ x
   |        x1             .                          |
-10|                       .                          |
   |                       .                    x4    |
-20|                       .                          |
   |                       .                          |
-30|                       .               x5         |
   |                       .                          |
-40|                       .                          |
   |                       .                          |
-50+--------------------------------------------------+
-50  -40  -30  -20  -10    0    10    20    30    40    50

*/