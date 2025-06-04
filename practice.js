// let arr = [...'hutesh'];
// console.log(arr);

// function abc(){
//     console.log(abc.xyz);
// }

// abc();
// abc.xyz = 400;
// abc.xyz = 200;
// abc();

// const number = [1,2,3,4];
// number[100]=500;
// console.log(number);

// console.log(parseInt("10+2"));
// console.log(parseInt("7FM"));
// console.log(parseInt("F7M"));

// console.log([1,2].map((num)=>{
//     if(num>0) return ;
//     return num*2;
// }))
function streamFirstNonRepeating(stream) {
  const freq = {};      // Track frequency of each character
  const queue = [];     // Maintain order of characters

  for (let ch of stream) {
    // Step 1: Update frequency
    freq[ch] = (freq[ch] || 0) + 1;

    // Step 2: Push to queue
    queue.push(ch);

    // Step 3: Remove front chars that are repeating
    while (queue.length && freq[queue[0]] > 1) {
      queue.shift();
    }

    // Step 4: Print result
    console.log(queue.length ? queue[0] : '#');
  }
}
streamFirstNonRepeating("aabc");
