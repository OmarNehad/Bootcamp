const Products = {
  123: ["Orange", 79.99, 0, 0],
  124: ["Apple", 50.99, 0, 0],
  125: ["Carrot", 40.99, 0, 0],
  126: ["Lemon", 30.99, 0, 0],
  127: ["Mango", 22.99, 0, 0],
  128: ["Tomato", 50.99, 0, 0],
  129: ["Cucumber", 11.99, 0, 0],
  133: ["Onions", 55.99, 0, 0],
  134: ["Eggs", 100.99, 0, 0],
  135: ["Chicken", 33.99, 0, 0],
};
var rows = 0;
var Total = 0;
let serialNum, product;
$(document).ready(function () {
  console.log(Object.keys(Products));
  // Managing searching for a product
  //
  $("#order").click(function () {
    alert(
      "Ordered successfully submitted, you can view it in the console and you can order another order"
    );

    Object.keys(Products).forEach((key) => {
      if (Products[key][2] != 0) {
        console.log(
          "you ordered " + Products[key][2] + " of " + Products[key][0]
        );
      }
    });
    $(".product").remove();
    Total = 0;
    $("#total").text("0$");

    Object.keys(Products).forEach((key) => {
      Products[key][2] = 0;
      Products[key][3] = 0;
    });
  });
  $("#serial-text").on("input", function () {
    serialNum = parseInt($(this).val());
    product = Products[serialNum];
    if (product) {
      updateProduct(serialNum, product, true);
    }
  });
});

$(document).on("click", "#minus", function () {
  serialNum = parseInt($(this).parent().parent().attr("id"));
  product = Products[serialNum];
  updateProduct(serialNum, product, false);
});
$(document).on("click", "#plus", function () {
  serialNum = parseInt($(this).parent().parent().attr("id"));
  product = Products[serialNum];
  updateProduct(serialNum, product, true);
});

function updateProduct(serialNum, product, isMore) {
  product[2] += isMore ? 1 : -1;
  product[3] += isMore ? product[1] : -product[1];
  Total += isMore ? product[1] : -product[1];
  $("#total").text(Total.toFixed(2) + "$");

  if ($("#" + serialNum).length == 0) {
    rows++;
    $("tbody").append(
      `
      <tr class="product" id="${serialNum}">
      <td class="product-num">${rows}</td>
        <td class="product-details">${product[0]}  </td>
        <td class="product-price">${product[1]}$</td>
        <td class="product-quantity">
          <button id="plus">+</button>
          <span>${product[2]}</span>
          <button id="minus">-</button>
        </td>
        <td class="product-total">${product[3].toFixed(2)}</td>
      </tr>`
    );
    return;
  }
  if (product[2] == 0) {
    $("#" + serialNum).remove();
    rows--;
  }
  $("#" + serialNum + " .product-quantity span").text(product[2]);
  $("#" + serialNum + " .product-total").text(product[3].toFixed(2));
}
