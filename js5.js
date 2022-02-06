 function cl(){
    let f1 = document.getElementById("field1"); 
    let f2 = document.getElementById("field2");
    let result = document.getElementById("result");
	let s = /^\d+$/;
    if(s.test(f1.value) && s.test(f2.value)){   
	  let a1= parseInt(f1.value);
	  let a2= parseInt(f2.value);
      result.innerHTML = a1*a2; 
    } 
	else{
      result.innerHTML = "Введите корректные данные";
    }
    return false;
  }

  window.addEventListener('DOMContentLoaded', function (event) { 
    console.log("DOM fully loaded and parsed");
    document.getElementById("button1").addEventListener("click", cl);
	}
  );