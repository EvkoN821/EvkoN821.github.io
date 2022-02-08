function updatePrice() {
  let count =  document.querySelector('#count').value.match(/^\d+$/);
  if (count <=0) {
    document.querySelector('.XAXA').innerHTML = '<span style="color: red;">кол-во товара должно быть больше нуля</span>';
    let checkDiv = document.getElementById("property");
    checkDiv.style.display = "none";
  }
  else {

	var select = document.querySelector('select[name=goods]');
	var price = 0;
	var prices = getPrices();
	let priceIndex = parseInt(select.value) - 1;
	if (priceIndex >= 0) {
		price = prices.prodTypes[priceIndex];
	}
  
	let radioDiv = document.getElementById("options");
	radioDiv.style.display = (select.value == "2" ? "block" : "none");
  
	let radios = document.getElementsByName("option");
	radios.forEach(function(radio) {
		if (radio.checked) {
			let optionPrice = prices.prodOptions[radio.value];
			if (optionPrice !== undefined) {
				price += optionPrice;
			}
		}
	});


	let checkDiv = document.getElementById("property");
	checkDiv.style.display = (select.value == "3" ? "block" : "none");

	let checkboxes = document.querySelectorAll("#property input");
	checkboxes.forEach(function(checkbox) {
		if (checkbox.checked) {
			let propPrice = prices.prodProperties[checkbox.name];
			if (propPrice !== undefined) {
				price += propPrice;
			}	
		}
	});
  
	let prodPrice = document.getElementById("result");
	prodPrice.innerHTML = count * price + " рублей";
  }
}

function getPrices() {
  return {
    prodTypes: [100, 150, 200],
    prodOptions: {
      o1: 5,
      o2: 10,
      o3: 15,
    },
    prodProperties: {
      property: 1,
    }
  };
}

window.addEventListener('DOMContentLoaded', function (event) {
  let radioDiv = document.getElementById("options");
  radioDiv.style.display = "none";
  let s = document.getElementsByName("goods");
  let select = s[0];
  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  let radios = document.getElementsByName("option");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
	checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  updatePrice();
  count.onkeypress = function(e) {
    if (e.keyCode == 13 ||  e.key == 13) {
      updatePrice();
    }
  };
});