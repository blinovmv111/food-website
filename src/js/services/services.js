const postData = async (url, data) => {
    // таким образом мы говорим, что внутри функции у нас будет асинхронный код
    const res = await fetch(url, {
      // благодаря await присвоение будет произведено только после получение результата, причем неважно какого (до 30 сек по стандарту)
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json(); // этим мы возвращаем из функции промис, у которго есть метод res.json(), который мы в дальнейшем сможем через цепочку then дальше обработать. И поскольку мы не знаем как скоро мы получим от сервера объект, нужно так же поставить await.
  };

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    } // у fetch есть особенность. Если он столкнется с ошибкой при отправке, он не выдаст сообщение, т.е. не выдаст reject, т.к. для него это не является ошибкой. Ошибка для него только отсутствие интернета или критические неполадки в самом запросе. Поэтому мы вставляем такие свойства как .ok и .status

    return await res.json(); // получаем обыный объект (не в формате json)
};

export {postData};
export {getResourse};