document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var form = document.getElementById('order-form');
  var product = document.getElementById('product');
  var quantity = document.getElementById('quantity');
  var error = document.getElementById('quantity-error');
  var result = document.getElementById('result');
  var quantityPattern = /^[1-9]\d*$/;
  var rubles = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var enteredQuantity = quantity.value.trim();

    if (!quantityPattern.test(enteredQuantity)) {
      error.hidden = false;
      quantity.setAttribute('aria-invalid', 'true');
      result.textContent = 'Не удалось рассчитать стоимость.';
      quantity.focus();
      return;
    }

    var count = Number.parseInt(enteredQuantity, 10);
    var unitPrice = Number.parseInt(product.value, 10);
    if (!Number.isSafeInteger(count) || !Number.isSafeInteger(unitPrice) || count * unitPrice > Number.MAX_SAFE_INTEGER) {
      error.textContent = 'Укажите меньшее количество товара.';
      error.hidden = false;
      quantity.setAttribute('aria-invalid', 'true');
      result.textContent = 'Не удалось рассчитать стоимость.';
      quantity.focus();
      return;
    }

    error.hidden = true;
    quantity.removeAttribute('aria-invalid');
    result.textContent = 'Стоимость заказа: ' + rubles.format(count * unitPrice) + '.';
  });

  quantity.addEventListener('input', function () {
    error.hidden = true;
    error.textContent = 'Введите целое положительное число без пробелов и других символов.';
    quantity.removeAttribute('aria-invalid');
  });
});
