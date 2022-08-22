// FORMAT: SERIAL NUMBER : [QUANTITY, TOTAL]
var Cart = {};
var rows = 0;
var cartTotal = 0;
var serialNum, product;
var Products = {};
$(document).ready(() => {
  $("#serial-button").click(async () => {
    serialNum = parseInt($("#serial-text").val());
    let product = await fetchProduct(serialNum);
    if (product) {
      if (!Cart[serialNum]) NewCartItem(serialNum, product);
      else IncreaseQuantity(serialNum, product.price);
    }
  });
  $("#order").click(() => {
    if ($(".product").length == 0) {
      alert("Cart is empty");
      return;
    }

    $(".product").remove();
    cartTotal = 0;
    $("#total").text("0$");
    // TODO: SAVE TO DATABASE

    $.ajax({
      url: "/order",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ order: Cart }),
      success: function (response) {
        alert(
          "Ordered successfully submitted, you can view it in the console and you can order another order"
        );
      },
    });
    Cart = {};
  });
});

function IncreaseQuantity(serialNum, productPrice) {
  let cartItem = Cart[serialNum];
  cartItem.quantity += 1;
  cartItem.total += productPrice;
  cartTotal += productPrice;
  updateCartTable(serialNum, cartItem);
}

function DecreaseQuantity(serialNum, productPrice) {
  let cartItem = Cart[serialNum];
  cartItem.quantity -= 1;

  cartItem.total -= productPrice;
  cartTotal -= productPrice;

  if (cartItem.quantity == 0) {
    $("#" + serialNum).remove();
    rows--;
  }
  updateCartTable(serialNum, cartItem);
}

function NewCartItem(serialNum, product) {
  Cart[serialNum] = {};
  let cartItem = Cart[serialNum];
  cartItem.quantity = 1;
  cartItem.total = product.price;
  cartTotal += product.price;
  rows++;

  $("tbody").append(
    `
    <tr class="product" id="${serialNum}">
    <td class="product-num">${rows}</td>
      <td class="product-details">${product.name}  </td>
      <td class="product-price">${product.price}$</td>
      <td class="product-quantity">
        <button id="plus" onClick='IncreaseQuantity(${serialNum},${
      product.price
    })' >+</button>
        <span>${cartItem.quantity}</span>
        <button id="minus" onClick='DecreaseQuantity(${serialNum},${
      product.price
    })' >-</button>
      </td>
      <td class="product-total">${cartItem.total.toFixed(2)}</td>
    </tr>`
  );
  $("#total").text(cartTotal.toFixed(2) + "$");
}

function updateCartTable(serialNum, cartItem) {
  $("#" + serialNum + " .product-quantity span").text(cartItem.quantity);
  $("#" + serialNum + " .product-total").text(cartItem.total.toFixed(2));
  $("#total").text(cartTotal.toFixed(2) + "$");
}

async function fetchProduct(id) {
  const response = await fetch("/products/" + id);
  try {
    return await response.json();
  } catch {
    alert("Serial Number not found");
    return null;
  }
}
