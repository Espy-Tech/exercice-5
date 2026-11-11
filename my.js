document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var form = document.getElementById('order-form');
  var product = document.getElementById('product');
  var quantity = document.getElementById('quantity');
  var error = document.getElementById('quantity-error');
  var result = document.getElementById('result');
  var quantityPattern = /^[1-9][0-9]{0,5}$/;
  var productPrices = Object.freeze({ '100': 100, '250': 250, '400': 400 });
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

    if (!Object.prototype.hasOwnProperty.call(productPrices, product.value)) {
      error.textContent = 'Выберите товар из списка.';
      error.hidden = false;
      result.textContent = 'Не удалось рассчитать стоимость.';
      product.focus();
      return;
    }

    var count = Number(enteredQuantity);
    var unitPrice = productPrices[product.value];
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
    var original = quantity.value;
    var position = quantity.selectionStart;
    var cleaned = original.replace(/[^0-9]/g, '').slice(0, 6);
    if (cleaned !== original) {
      quantity.value = cleaned;
      var cleanedBeforeCursor = original.slice(0, position).replace(/[^0-9]/g, '').slice(0, 6);
      quantity.setSelectionRange(cleanedBeforeCursor.length, cleanedBeforeCursor.length);
    }
    error.hidden = true;
    error.textContent = 'Введите целое число от 1 до 999999 без пробелов и других символов.';
    quantity.removeAttribute('aria-invalid');
  });
});
