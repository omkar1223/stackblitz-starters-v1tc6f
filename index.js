const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

function getWelcomeMessage() {
  return 'Welcome to our service';
}

app.get('/welcome', (req, res) => {
  res.send(getWelcomeMessage());
});

function getGreetingMessage(req) {
  name = req.query.name;
  return 'Hello, ' + name;
}

app.get('/greetings', (req, res) => {
  res.send(getGreetingMessage(req));
});

function checkPassword(password) {
  if (password.length > 15) {
    return 'Password is strong';
  } else {
    return 'password is weak';
  }
}

app.get('/password', (req, res) => {
  let password = req.query.password;
  res.send(checkPassword(password));
});

function getSum(req) {
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);

  return num1 + num2;
}

app.get('/sum', (req, res) => {
  res.send(getSum(req).toString());
});

function getSubStatus(username, subscribed) {
  if (subscribed === 'true') {
    return username + ' is subscribed';
  } else {
    return username + ' is not subscribed';
  }
}

app.get('/subscription-status', (req, res) => {
  let username = req.query.username;
  let subscribed = req.query.isSubscribed;

  res.send(getSubStatus(username, subscribed));
});

function calculateDiscountedPrice(price, discount) {
  if (isNaN(price) || isNaN(discount)) {
    return 'Invalid input';
  }

  if (discount >= 100) {
    return 'Discount cannot be greater than or equal to 100%';
  }

  let totalPrice = price - (price * discount) / 100;
  return totalPrice;
}

app.get('/discounted-price', (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);

  res.send(calculateDiscountedPrice(price, discount).toString());
});

function greetingMessage(name, age, gender) {
  return 'Hello ' + name + '!, You are ' + age + ' years old ' + gender + '.';
}

app.get('/personal-greetings', (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  let gender = req.query.gender;

  res.send(greetingMessage(name, age, gender));
});

function finalPrice(price, discount, tax) {
  let discountedPrice = price - (price * discount) / 100;
  let finalPrice = discountedPrice + discountedPrice * (tax / 100);
  return finalPrice.toString();
}

app.get('/final-price', (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);

  res.send(finalPrice(price, discount, tax));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
