const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')

    const getData = () => {
    fetch('/db/db.json').then((response) => {
        return response.json()
    })
    .then((data => {
      localStorage.setItem(data, JSON.stringify);
         return data.json();
    }))
};

    links.forEach((link) => {
     link.addEventListener('click',(event) => {
         event.preventDefault();
        getData();
     })
    });


    localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]));

    const goods = (JSON.parse(localStorage.getItem('goods')));
    console.log(goods);

    localStorage.removeItem('goods');
    
};

getGoods();