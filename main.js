const btn = document.querySelectorAll(".wraper-btn button");


let arr = [];
btn.forEach( (item, i) => {
  item.addEventListener("click",  e => {
    const input = document.querySelector(".wraper-input .input")
    let btnInput = e.target.textContent;
    if(btnInput === "AC" || btnInput === "=" || btnInput === "del")
    {
      btnInput = "";
    }
    if(input.value === "") {
      if(i === 7 || i === 11 || i === 18) {
        input.value = ""
        return
      }
    } 
    
  
     const result = controller(input.value);
    
     switch(true) {
       case i === 0 :
         delAll()
         break;
       case i === 19 :
         // delete
        input.value = del(result)
         break;
       case i === 20 :
         // result
        if(result !== "") {
          input.value = eval(result).toString();
        }
        if(arr[arr.length - 1] === tempValue) return;
          arr.push(input.value);
         break;
       case i === 7 || i === 11 || i === 15 || i === 18:
        input.value = operator(input.value, btnInput)
        break
       default :
        input.value += btnInput;
        arr.push(input.value)
       break;
     }
  
  })
})


const controller = (value) => {
  let temp = setValue(value)
  temp = temp.filter( a => a !== "");

  if(value.includes("%")) {
    temp =  setPercent(temp);
   }
  
  if(value.includes("(") || value.includes(")")) {
    temp =  setBrackets(temp);
  }
  
  if(value.includes('^')) {
    temp = exponent(temp);
  }
  
  if(value.includes('√')) {
    temp = sqrt(temp);
  }
  
  if(value.includes('π')) {
    temp = PI(temp);
  }
  
  if(value.includes('!')) {
    temp =  faktorial(temp)
  }

  return temp.join('')
}


const del = (value) => {
  arr = arr.slice(0, arr.length - 1)
  if(arr.length < 1) return "";
  return arr[arr.length - 1]
}

const delAll = () => {
  const input = document.querySelector(".wraper-input .input")
  input.value = "";
  arr = [];
}


const operator = (value, r) => {
  let b = value.split('');
  const i = b.length - 1;
  if(b[i] === "*" || b[i] === "/" || b[i] === "-" || b[i] === "+") {
    b[i] = "";
    arr.pop(arr[i]);
  }
   b.push(r)
   arr.push(b.join(""));
  return b.join('');
}



const setValue = (value) => {
  const result = value.split('').map(a => {
    if(a === "/" || a === "*" || a === "-" || a === "+" || a === "(" || a === ")" || a === "π" ) {
      a = ':' + a + ':'
    }
  
    return a;
  }).join('')
  return result.split(':');
}

const setPercent = (value) => {
  return value.map(a => {
    if(a.includes('%')) {
      a = eval(a.split('').map(b => b === "%" ? "/100" : b).join(''));
    }
    return a.toString();
  })
}




const setBrackets = (value) => {
  
 value = value.map(a => {
   if(a === "(") a = "*(";
   if(a === ")") a = ")*";
   return a;
 })

if(value[0] === "*(") value[0] = "(";
if(value[value.length - 1] === ")*") value[value.length - 1] = ")";
const i = value.indexOf(")*")
const c = value.indexOf("*(")
if(value[i + 1] === "*(") value[i + 1] = "(";

const array = ["-", "*" , "/" , "+", "π"]

  if(array.some( a => a === value[i + 1])) {
    value[i] = ")";
 }
 
  if(array.some( a => a === value[c - 1])) {
    value[c] = "(";
 }
 
return value;
}
  

const exponent = (value) => {
  return  value.map( a => {
    if(a.includes('^')) {
      a = a.split('^');
      a = a[0] **= a[1]
    }
    return a.toString();
  })
}


const sqrt =  (value) => {
  return  value.map( a => {
    if(a.includes('√')) {
     if(a[0] === "√") {
       a = a.split('')
       a[0] = "";
       a = a.join('')
       a = Math.sqrt(a)
     } else {
       a = a.split('√');
       a = a[0] * Math.sqrt(a[1])
     }
    }
    return a.toString();
  })
}


const PI = (value) => {
  const i = value.indexOf('π')
  value[i] = Math.PI
  
  const array = ["-", "*" , "/" , "+"]
  if(!array.some( a => a === value[i - 1])) {
    if(i !== 0) value[i] = "*" + value[i];
 }

if(!array.some(a => a === value[i + 1])) {
  if(i !== value.length - 1) value[i] = value[i] + "*"
}

  return value
}


const faktorial = (value) => {
  return value.map( a => {
    if(a.includes("!")) {
      a = a.split('').reverse()
      a[0] = "";
      a = a.reverse()
      a = setFaktorial(a.join(''));
    }
    return a.toString();
  })
}

const setFaktorial = (value) => {
  if(value === 0) return 1;
  return (value * setFaktorial(value - 1))
}



const button = document.querySelectorAll(".btn-box button") 

button.forEach((item, i) => {
  item.addEventListener("click", e => {
    const input = document.querySelector(".wraper-input .input");
    let btn = e.target.textContent;

    input.value += btn
    controller(input.value);
     arr.push(input.value)
  })
})


