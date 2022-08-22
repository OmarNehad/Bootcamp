// FORMAT: SERIAL NUMBER : [QUANTITY, TOTAL]
const Cart = {};
var rows = 0;
var Total = 0;
var serialNum, product;
var Products = {};
$(document).ready(function () {
  $("#serial-button").click(() => {
    serialNum = parseInt($("#serial-text").val());
    //var Products = {};
    fetchProduct(serialNum);
  });
  $("#order").click(() => {
    alert(
      "Ordered successfully submitted, you can view it in the console and you can order another order"
    );
    $(".product").remove();
    Total = 0;
    $("#total").text("0$");
    // TODO: SAVE TO DATABASE
  });
});

$(document).on("click", "#minus", () => {
  serialNum = parseInt($(this).parent().parent().attr("id"));
  DecreaseQuantity(serialNum);
});
$(document).on("click", "#plus", () => {
  serialNum = parseInt($(this).parent().parent().attr("id"));
  IncreaseQuantity(serialNum);
});

function IncreaseQuantity(serialNum) {
  let product = Products[serialNum];
  if ($("#" + serialNum).length == 0) {
    NewCartItem(serialNum);
  }
  // UPDATING EXISITING CART ITEM
  else {
    let cartItem = Cart[serialNum];
    cartItem[0] += 1;
    cartItem[1] += product[1];
    Total += product[1];

    updateCartTable(serialNum, cartItem);
  }
}

function DecreaseQuantity(serialNum) {
  let product = Products[serialNum];
  let cartItem = Cart[serialNum];
  cartItem[0] -= 1;
  cartItem[1] -= product[1];
  Total -= product[1];

  if (cartItem[0] == 0) {
    $("#" + serialNum).remove();
    rows--;
  }
  updateCartTable(serialNum, cartItem);
}

function NewCartItem(serialNum) {
  let product = Products[serialNum];
  Cart[serialNum] = [1, product[1]];
  let cartItem = Cart[serialNum];
  Total += product[1];
  rows++;

  $("tbody").append(
    `
    <tr class="product" id="${serialNum}">
    <td class="product-num">${rows}</td>
      <td class="product-details">${product[0]}  </td>
      <td class="product-price">${product[1]}$</td>
      <td class="product-quantity">
        <button id="plus">+</button>
        <span>${cartItem[0]}</span>
        <button id="minus">-</button>
      </td>
      <td class="product-total">${cartItem[1].toFixed(2)}</td>
    </tr>`
  );
  $("#total").text(Total.toFixed(2) + "$");
}

function updateCartTable(serialNum, cartItem) {
  $("#" + serialNum + " .product-quantity span").text(cartItem[0]);
  $("#" + serialNum + " .product-total").text(cartItem[1].toFixed(2));
  $("#total").text(Total.toFixed(2) + "$");
}

async function fetchProduct(id) {
  const response = await fetch("/products/" + id);
  try {
    const product = await response.json();
    //IncreaseQuantity();
  } catch {
    alert("Serial Number not found");
  }
}
