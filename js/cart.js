const cart = function () {
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.getElementById('modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
    const goodsContainer = document.querySelector('.long-goods-list');
    const cartTable = document.querySelector('.cart-table__goods');
    const cartTableTotal = document.querySelector('.card-table__total');
    const modalForm = document.querySelector('.modal-form');
    const inputName = modalForm.querySelector('.modal-input[name="nameCustomer"]');
    const inputPhone = modalForm.querySelector('.modal-input[name="phoneCustomer"]');
    
    // функция удвления товара из корзины
    const deleteCartItem = (id) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
  
      const newCart = cart.filter(good => {
        return good.id !== id;
      })
  
      localStorage.setItem('cart', JSON.stringify(newCart));
      renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    }
    
        // Функция увеличения колличества товара в корзине
    const plusCartItem = (id) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
  
      const newCart = cart.map(good => {
        if (good.id === id) {
          good.count++;
        }
        return good;
      })
  
      localStorage.setItem('cart', JSON.stringify(newCart));
      renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  
    }
  

     // Функция уменьшения колличества товара в корзине
    const minusCartItem = (id) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
  
      const newCart = cart.map(good => {
        if (good.id === id) {
          if (good.count > 0) {
            good.count--;
          }
        }
        return good;
      })
  

      // Сохранения товара в localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    }
  
    const addToCart = (id) => {
      const goods = JSON.parse(localStorage.getItem('goods'));
      const clickedGood = goods.find(good => good.id === id);
  
      const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
  

        // Увеличеть количество товара или добавления его в корзину
      if (cart.some(good => good.id === clickedGood.id)) {
        cart.map(good => {
          if (good.id === clickedGood.id) {
            good.count++;
          }
          return good;
        })
      } else {
        clickedGood.count = 1;
        cart.push(clickedGood);
      }
  
        // Готовая база товара в корзине
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  

  // Отрисовка товара в корзине
    const renderCartGoods = (goods) => {
      cartTable.innerHTML = '';
  
      goods.forEach(good => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <tr>
        <td>${good.name}</td>
        <td>${good.price}</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${good.count}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>${+good.price * +good.count}$</td>
        <td><button class="cart-btn-delete">x</button></td>
      </tr>
        `;
  
        cartTable.append(tr);
        

          // Оживляем кнопки корзины
        tr.addEventListener('click', (e) => {
  
          if (e.target.classList.contains('cart-btn-minus')) {
            minusCartItem(good.id);
          } else if (e.target.classList.contains('cart-btn-plus')) {
            plusCartItem(good.id);
          } else if (e.target.classList.contains('cart-btn-delete')) {
            deleteCartItem(good.id);
          }
        })
  
      });
  
      renderTotalCost();
    }
  
    const sendForm = () => {
      const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
  
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          cart: cartArray,
          name: inputName.value,
          phone: inputPhone.value,
          totalCost: renderTotalCost()
        })
      }).then(() => {
        localStorage.removeItem('cart');
        cart.style.display = '';
      })
    }
  
    modalForm.addEventListener('submit', e => {
      e.preventDefault();
      sendForm();
    })
  
    // Функция посчета суммы корзины
    const renderTotalCost = () => {
      const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
  
      const sum = cartArray.reduce((acc, good) => {
        return acc + (+good.price * good.count);
      }, 0);
  
      cartTableTotal.innerHTML = sum + '$';
  
      return sum;
    }
  

    // Функция вызова модального окна
    cartBtn.addEventListener('click', function () {
      const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
  
      renderCartGoods(cartArray);
      cart.style.display = 'flex';
    });
  
      // Функция закрытия модальног окна
    closeBtn.addEventListener('click', function () {
      cart.style.display = '';
    });
  
    // Функция закрытия окна по нажатию вне его
    cart.addEventListener('click', (event) => {
      if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
        cart.style.display = '';
      }
    })
    
    // Функция закрытия окна при нажатии на Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cart.style.display = '';
      }
    })
  

     // Функция добавления товара в корзину при нажатии на кнопку с ценой
    if (goodsContainer) {
  
      goodsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.add-to-cart')) {
          const buttonToCart = event.target.closest('.add-to-cart');
          const goodId = buttonToCart.dataset.id;
          addToCart(goodId);
        }
      })
    }
  }
  
  cart();