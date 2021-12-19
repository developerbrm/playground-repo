const count = 20;

const getElement = (ele, text) => {
  const element = document.createElement(ele);
  element.textContent = text;

  return element;
};

const getPokemon = async (count) => {
  // const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${count}`;
  const apiURL = `https://pokeapi.co/api/v2/pokemon/${count}`;

  const res = await fetch(apiURL);
  const data = await res.json();

  return data;
};

const appendPtoLi = async (value) => {
  return document
    .querySelector("ul")
    .appendChild(getElement("li", ""))
    .appendChild(getElement("p", value));
};

const spitToDOM = async (count, timeGap = 2000) => {
  for (let i = 1; i <= count; i++) {
    const {
      species: { name = "" },
    } = await getPokemon(i).catch((err) => {
      console.log(err);
    });

    const newP = await appendPtoLi(name);
    newP.scrollIntoView();
  }

  // const result = await Promise.allSettled(
  //   [...Array(count)].map((_, index) =>
  //     getPokemon(index % 3 === 0 ? "lol" : index + 1)
  //   )
  // );

  // result.forEach(({ status, value, reason = "" }) => {
  //   if (status === "fulfilled") {
  //     const {
  //       species: { name = "" },
  //     } = value;

  //     document
  //       .querySelector("ul")
  //       .appendChild(getElement("li", ""))
  //       .appendChild(getElement("p", name));
  //   } else {
  //     console.log(reason);
  //   }
  // });
};

spitToDOM(300).catch((err) => console.log(err));
