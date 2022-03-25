const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link'); // Ссылка навигационного меню
    const more = document.querySelector('.more'); //Кнопка 'больше'

    //Отрисовка карточки
   const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');

        goodsContainer.innerHTML ='';

        //Макет карточки
        goods.forEach(good => {
            const goodBlock = document.createElement('div');

            //Добавляем классы
            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');

            //Сохранение карточки
            goodBlock.innerHTML = `
            <div class="goods-card">
            <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
            <img src="db/${good.img}" alt="${good.name}" class="goods-image">
            <h3 class="goods-title">${good.name}</h3>
            <p class="goods-description">${good.description}</p>
            <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                <span class="button-price">$${good.price}</span>
            </button>
        </div>
        `

        goodsContainer.append(goodBlock);

        })
   }

    
   //Обработчик данных с сервера
    const getData = (value, category) => {
    fetch('/db/db.json').then((response) => {
        return response.json()
    })
    .then((data) => {
        const array = category ? data.filter((item) => item[category] === value) : data;

        //Возвращаем базу
        localStorage.setItem("goods", JSON.stringify(array));

        
        if(window.location.pathname !== '/goods.html'){
            window.location.href = '/goods.html'
        }
        else{
            renderGoods(array);
        }
    })
};

    links.forEach((link) => {
     link.addEventListener('click',(event) => { //Сохранение базы в LocalStorage
         event.preventDefault();
         const linkValaue = link.textContent;
         const category = link.dataset.field;

        getData(linkValaue, category);
     })

    });

    if(localStorage.getItem('goods') && (window.location.pathname === '/goods.html')){ // Проверяем наличие данных
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }
    
    if(more){
        more.addEventListener('click', (event) => {  //Функция кнопки 'больше'
            event.preventDefault();

            getData();
        })
    }
    
};

getGoods();