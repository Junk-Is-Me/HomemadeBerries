function search(){
    const input = document.querySelector('.search-block > input'); // Строка поиска
    const searchBtn = document.querySelector('.search-block > button'); // Кнопка строки поиска

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list') //Контейнер для карточек

        goodsContainer.innerHTML =''; //Удаляем содержимое контейнера   

        //Макет карточки 
        goods.forEach(good => {
            const goodBlock = document.createElement('div') //Блок карточки 


            //Добавляем классы 
            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');
            
            
            //Содержимое карточки
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

    // Обработчик данных с сервера
    const getData = (value, category) => {
    fetch('/db/db.json').then((response) => {
        return response.json()
    })
    .then((data) => {
        const array = data.filter(good => {
           return good.name.toLowerCase().includes(value.toLowerCase());
        });

        // Воозвращаем базу
        localStorage.setItem("goods", JSON.stringify(array));

        
        if(window.location.pathname !== '/goods.html'){
            window.location.href = '/goods.html'
        }
        else{
            renderGoods(array);
        }
    })
};

     // Отправляем значение строки поиска
    searchBtn.addEventListener('click', () => {
        getData(input.value);

    })
}

search();