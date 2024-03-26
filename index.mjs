const btnCustomer = document.getElementById("btn-customers");
const btnCheckout = document.getElementById("btn-checkout");
const frame = document.getElementById("div-frame");

const Block = document.createElement("iframe");

const customersApi = async () => {
  const cardData = {
    email: "albert@example.net",
    mobile: "+3363998014543",
    name: "Albert Doe",
  };
  try {
    const response = await fetch(URLCUSTOMER, {
      method: "POST",
      body: JSON.stringify(cardData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.API_KEY_PUBLIC}:${process.env.API_KEY_PRIVATE}`
        ).toString("base64")}`,
      },
    });
  } catch (error) {
    console.log(eror);
  }
};
const checkoutApi = async () => {
  const checkoutData = {
    amount: "3000",
    currency: "eur",
    description: "10 rue paris, 75010 Paris, France",
    customer: {
      email: "albert@example.net",
      mobile: "+3363998014543",
      name: "Albert Doe",
    },
  };
  await fetch(URL_CHECKKOUT, {
    method: "POST",
    body: JSON.stringify(checkoutData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.API_KEY_PUBLIC}:${process.env.API_KEY_PRIVATE}`
      ).toString("base64")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      Block.src = `https://payment.stancer.com/${apiKeyPublic}/${data.id}?lang=fr`;
      frame.appendChild(Block);
    });
};

btnCustomer.addEventListener("click", customersApi);
btnCheckout.addEventListener("click", checkoutApi);

const client = async ({ url, method, data }) => {
  try {
    const response = await fetch(`https://api.stancer.com/v1/${url}`, {
      method,
      ...(method !== "GET" && { body: JSON.stringify(data) }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.API_KEY_PUBLIC}:${process.env.API_KEY_PRIVATE}`
        ).toString("base64")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
