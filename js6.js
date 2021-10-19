
function getPriceO(number, type, option) {
	let res = document.getElementById("result");
	if (number != 0) {
		switch (option) {
			case "o1":
				res.innerHTML = ((type + 1000) * number);
				break;
			case "o2":
				res.innerHTML = ((type + 2000) * number);
				break;
			case "o3":
				res.innerHTML = ((type + 3000) * number);
				break;
		}
	} 
	else {
		res.innerHTML = "введите корректные данные";
	}
}
function getPrice(number, type) {
	let res = document.getElementById("result");
	if (number != 0) {
		res.innerHTML = type * number;
	} 
	else {
		res.innerHTML = "введите корректные данные";
	}
}

window.addEventListener('DOMContentLoaded', function(event) {
	console.log("DOM fully loaded and parsed");
	let typeAll = [99999, 1200, 8000];
	let type = typeAll[0];
	let number = 0;
	let rl = "";
    let f1 = true, f2=true, f3=true;
	let res = document.getElementById("result");
	res.innerHTML = "введите данные";
	let re = /^\d+$/;
	let numberHTML = document.getElementById("number");
	numberHTML.addEventListener("change", function(event) {
		if (re.test(event.target.value)) {
		number = parseInt(event.target.value);
        if(f1 && f2){
		getPrice(number, type);
            } 
	    else if(!f1){
                getPriceO(number, type, rl);
                f1 = true;
            } 
	    else if(!f2 && !f3){
                res.innerHTML = (type - 1000) * number;
                f2 = true;
		f3 = true;
            } 
	    else if(f3){
		getPrice(number, type);
	    }

            let a = document.getElementsByName("goods");
	        a[0].addEventListener("change", function(event) {
		        let select = event.target;
		        let radios = document.getElementById("options");
		        let checkbox = document.getElementById("property");
				if (select.value == "zayt") {
					radios.style.display = "none";
					checkbox.style.display = "none";
					type = typeAll[0];
					getPrice(number, type);
				} 
				else if (select.value == "anas") {
					radios.style.display = "none";
					checkbox.style.display = "block";
					type = typeAll[1];
					getPrice(number, type);
				} 
				else {
					radios.style.display = "block";
					checkbox.style.display = "none";
					type = typeAll[2];
					getPrice(number, type);
				}
		    a[0].blur();
            }
			);

            let radioHTML = document.querySelectorAll(".options input[type=radio]");
	        radioHTML.forEach(function(radio) {
		        radio.addEventListener("change", function(event) {
			    rl = event.target.value;
			    getPriceO(number, type, rl);
                	    f1 = false;
		        });
	        });

            let c = document.getElementsByName("property");
	        c[0].addEventListener("change", function(event) {
		        if (event.target.checked && number != 0) {
			        res.innerHTML = (type - 1000) * number;
                                f2 = false;
				f3 = false;
		        } 
			else {
			        getPrice(number, type);
				f3 = true;
		        }
	        });
		} 
		else {
			number = 0;
			res.innerHTML = "введите корректные данные";
		}
		numberHTML.blur();
	});

});
