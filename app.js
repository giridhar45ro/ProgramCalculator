// app.js
document.getElementById('discount-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    validateForm();
});

// Add event listeners to all radio buttons to hide the discounted price when input changes
var radios = document.querySelectorAll('input[type="radio"]');
radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
        hideDiscountedPrice();
        disableThirdFormGroup();
    });
});

// Disable the third form group when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    disableThirdFormGroup();
});


function hideDiscountedPrice() {
    var discountedPrice = document.querySelector('.discounted-price');
    discountedPrice.style.display = 'none'; // Hide discounted price
}

function disableThirdFormGroup() {
    var programValue = document.querySelector('input[name="program"]:checked').value;
    var thirdFormGroupInputs = document.querySelectorAll('input[name="status"]');
    if (programValue === "EOE") {
        thirdFormGroupInputs.forEach(function(input) {
            input.disabled = true; // Disable input in third form group
        });
    } else {
        thirdFormGroupInputs.forEach(function(input) {
            input.disabled = false; // Enable input in third form group
        });
    }
}

function validateForm() {
    var category = document.querySelector('input[name="category"]:checked').value;
    var program = document.querySelector('input[name="program"]:checked').value;

    var discountedPrice = document.querySelector('.discounted-price');

    var price = 2000;
    var refundAmount = 0;

    var pricing = {"yamuna":2000, "cat-2":5000, "cat-3":10000}

    for(var cat in pricing){
        if(category === cat){
            price = pricing[cat];
            break;
        }
    }

    if(program != "EOE"){
        var lan = {"ENG":4000, "REGIONAL":2000}
        var status = document.querySelector('input[name="status"]:checked').value;

        if(status === "NOTSTARTED"){
            price += lan[program];
            refundAmount = price * 0.8;
        }
        if(status === "STARTED"){
            refundAmount = price * 0.8;
        }

    }else{
        refundAmount = price * 0.8;
    }      
    discountedPrice.style.display = 'block'; 
    discountedPrice.innerHTML = refundAmount;    
}

