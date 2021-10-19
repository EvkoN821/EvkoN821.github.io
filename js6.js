function getPrice(amount, type) {
	let result = document.getElementById("result");
	if (amount != 0) {
		result.innerHTML = type * amount;
	} else {
		result.innerHTML = "Пожалуйста, введите корректные данные";
	}
}

function getPriceOptions(amount, type, option) {
	let result = document.getElementById("result");
	if (amount == 0) {
		result.innerHTML = "Пожалуйста, введите корректные данные";
	} else {
		switch (option) {
			case "o1":
				result.innerHTML = ((type + 1500) * amount);
				break;
			case "o2":
				result.innerHTML = ((type + 3000) * amount);
				break;
			case "o3":
				result.innerHTML = ((type + 5000) * amount);
				break;
		}
	}
}

window.addEventListener('DOMContentLoaded', function(event) {
	console.log("DOM fully loaded and parsed");
    let radioListener = "";
	let amount = 0;
	let typeAll = [2500, 5000, 10000];
	let type = typeAll[0];
    let flag_1 = true, flag_2=true, flag_3=true;
	let result = document.getElementById("result");
	result.innerHTML = "Пожалуйста, введите данные";

	let re = /^\d+$/;

	let amountHTML = document.getElementById("amount");
	amountHTML.addEventListener("change", function(event) {
		if (re.test(event.target.value)) {
		amount = parseInt(event.target.value);
            if(flag_1 && flag_2){
		getPrice(amount, type);
            } else if(!flag_1){
                getPriceOptions(amount, type, radioListener);
                flag_1 = true;
            } else if(!flag_2 && !flag_3){
                result.innerHTML = (type - 1000) * amount;
                flag_2 = true;
		flag_3 = true;
            } else if(flag_3){
		getPrice(amount, type);
		}

            let s = document.getElementsByName("list_of_goods");
	        s[0].addEventListener("change", function(event) {
		        let select = event.target;
		        let radios = document.getElementById("options");
		        let checkbox = document.getElementById("property");
		    if (select.value == "cup") {
			    radios.style.display = "none";
			    checkbox.style.display = "none";
			    type = typeAll[0];
			    getPrice(amount, type);
		    } else if (select.value == "pants") {
			    radios.style.display = "none";
			    checkbox.style.display = "block";
			    type = typeAll[1];
			    getPrice(amount, type);
		    } else {
			    radios.style.display = "block";
			    checkbox.style.display = "none";
			    type = typeAll[2];
			    getPrice(amount, type);
		    }
		    s[0].blur();
            });

            let radioHTML = document.querySelectorAll(".options input[type=radio]");
	        radioHTML.forEach(function(radio) {
		        radio.addEventListener("change", function(event) {
			    radioListener = event.target.value;
			    getPriceOptions(amount, type, radioListener);
                	    flag_1 = false;
		        });
	        });

            let c = document.getElementsByName("property");
	        c[0].addEventListener("change", function(event) {
		        if (event.target.checked && amount != 0) {
			        result.innerHTML = (type - 1000) * amount;
                    			flag_2 = false;
					flag_3 = false;
		        } else {
			        getPrice(amount, type);
					flag_3 = true;
		        }
	        });

		} else {
			amount = 0;
			result.innerHTML = "Пожалуйста, введите корректные данные";
		}
		amountHTML.blur();
	});
	
});
