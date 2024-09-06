

function generateArray(arrayLength = 2, elemSize = 50, lengthMin = 2, elemMin = -50){
    let length = Math.floor((Math.random() * (arrayLength - lengthMin)) + lengthMin)
    var array= [];
    for(let i = 0; i < length; i++){
        array.push(Math.floor(Math.random() * ((elemSize+1) - elemMin) + elemMin))
    }
    //console.log("Generated Array:", array);
    return array;
}  

function generate2DCoords(arrayLength){
    let arr = [];
    let length = Math.floor(Math.random() * arrayLength + 1);
    for(let i = 0; i<length; i++){
        arr.push(generateArray());
    }
    console.log("Customer Coordinates:", arr);
    return arr;
}

function sortCoords(array, coordXOrY){
    let coordinate = coordXOrY == "x" ? 0 : 1;
    if(array.length == 1){ return [array[0][coordinate]];}
    
    let sortedArray = [];
    let temp = array[0][coordinate];

    for(let i = 0; i<array.length-1; i++){
        if (array[i][coordinate] > array[i+1][coordinate]){
            temp = array[i+1][coordinate];
            array[i+1][coordinate] = array[i][coordinate];
            array[i][coordinate] = temp;
            i = -1; //Resets the for-loop, its -1 because it iterates again after this if-statement making it 0 again
        }
    }
    for(let i = 0; i<array.length; i++){
        sortedArray[i] = array[i][coordinate];
    }
    console.log(`${coordXOrY}`, sortedArray)
    return sortedArray;
}

function optimalSpot(arr){
    finalCoords = [];   
    if(arr.length == 1){
        finalCoords.push(arr[0][0],arr[0][1]);
        return finalCoords;
    }

    //Even amount of Coordinates or Odd?
    evenNotOdd = arr.length % 2 == 0 ? true : false;
    xCoords = sortCoords(arr, "x");
    yCoords = sortCoords(arr, "y");
    
    //Finding the Median
    if(evenNotOdd){
        finalCoords[0] = (xCoords[(arr.length/2)-1] + xCoords[arr.length/2])/2;
        finalCoords[1] = (yCoords[(arr.length/2)-1] + yCoords[arr.length/2])/2;
    }else{
        finalCoords[0] = xCoords[Math.ceil((arr.length/2)-1)];
        finalCoords[1] = yCoords[Math.ceil((arr.length/2)-1)];
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