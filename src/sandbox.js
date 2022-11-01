let lastSeven = [];
let d = Math.floor(Date.now() - 284014800);
console.log(d);
for (let i = 0; i < 7; i++) {
  d = d - 864e5;
  lastSeven.push(d);
}
console.log(lastSeven);
