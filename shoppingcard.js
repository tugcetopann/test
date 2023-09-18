document.addEventListener("DOMContentLoaded", function () {
  class ShoppingCart {
    //shoppingCart adinda bir sinif tanimlanir.
    constructor() {
      // bir sinifin nesne ornegini baslatmak ve olusturmak icin kullanilan methotdur. Sinif ornekleri olusturuldugunda calisir.
      this.items = [];
      this.totalQuantity = 0;
      this.totalPrice = 0;
    }

    additem(item) {
      // oge eklemek icin kullanilan metoddur. ogeyi diziden cikarir, toplam miktr ve toplam fiyati gunceller.
      this.items.push(item); // bir dizinin sonuna yeni oge ekler.
      this.totalQuantity = this.totalQuantity + item.quantity; //eski totalQuantity'e itemdaki quantity'i ekleyerek yeni bir total quantity olusturur.
      this.price = this.price + item.quantity * item.price; //eski totalPrice'a itemdaki price'i ekleyerek yeni bir total price olusturur.
      this.render(item);
    }
    render(item) {
      //ürünü ürün listesine ekleme
      const productsDiv = document.getElementById("products");

      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productsDiv.innerHTML += this.card(item);
      productsDiv.appendChild(productDiv);

      //Sepet dropdown içeriğini güncelle
      const cartItemsDiv = document.getElementById("cartItems");
      cartItemsDiv.innerHTML = "";
      /*
      const newCartItem1 = document.createElement("a");
      newCartItem1.href = "#";
      newCartItem1.textContent = item.name;
      cartItemsDiv.appendChild(newCartItem1);

      const newCartItem2 = document.createElement("div");
      newCartItem2.href = "#";
      newCartItem2.textContent = item.name;
      cartItemsDiv.appendChild(newCartItem2);

      const deleteTest1 = document.createElement("button");
      deleteTest1.textContent = "Sil";
      deleteTest1.addEventListener("click", () => this.removeItem(item));
      cartItemsDiv.appendChild(deleteTest1);

      const deleteTest2 = document.createElement("button");
      deleteTest2.textContent = "Sil";
      deleteTest2.addEventListener("click", () => this.removeItem(item));
      cartItemsDiv.appendChild(deleteTest2);
      */
    }

    card = function (item) {
      return `<div class="product">
            
            
        <div id="product-head">
            <img src="https://cdn.cimri.io/image/200x200/apple-macbook-air-mgn63tu-a-m1-8gb-ram-256gb-macos-13-inc-uzay-grisi-laptop-notebook_650662158.jpg" class="product-image" alt>
            <h3 id="productName" class="title"> ${item.name}</h3>
            <p id="price">${item.price} TL</p>
            <label for="Quantity"></label>
            <input type="number" id="Quantity" value="${item.quantity}" min="1">
        </div>

        <div class="product-body">
            <button class="shoppingcard-button" onclick="${addToCart(
              "${item.name}",
              "${item.price}",
              "${item.id}"
            )}" > Sepete Ekle </button>
            
        </div>

        </div>`;
    };

    removeItem(item) {
      // oge cikartmak icin kullanilan metottur.
      const index = this.items.indexOf(item); // indexOf(item) items'in icerisine gider itemsdaki konumunu bulur. Const index bulunan ogenin indeksini index adli degiskende tutar. items'in icindeki item kacinci siradaysa index o olur.

      if (index !== -1) {
        //Bu if koşulu belirli bir ögenin items dizisinde bulunup bulunmadığını kontrol eder. Eger oge dizide bulunuyorsa(index değeri -1 değilse) döngü çalışır.
        const removedItem = this.items.splice(index, 1)[0]; //splice methodu belirli bir ögeyi çıkartır. Splice methodu çıkartılan ögeyi içeren bir dizi döndürür ve [0] ile bu dizinin ilk ögesine erişir.
        const removedId = removedItem.Id; // çıkartılan ögenin ıd'si removedId adlı bir değişkende saklanır.
        this.totalQuantity = this.totalQuantity - item.quantity; // toplam miktar güncelleme
        this.totalPrice = this.totalPrice - item.quantity * item.price; //toplam fiyat güncelleme
      }
    }

    updateQuantity(item, newQuantity) {
      // Miktarı güncellemek içindir.
      const index = this.items.indexOf(item); //items'ın içerisindeki item değerinin konumu bulunur. (indexof methodu ile )
      this.items[index].quantity = newQuantity; //

      this.totalQuantity = 0; // toplam miktar sıfıra eşitledik
      for (let i = 0; i < this.items.length; i++) {
        // bir for döngüsü başlattık. Bu for döngüsü
        this.totalQuantity = this.totalQuantity + this.items[i].quantity;
      }
    }

    calculateTotalPrice() {
      this.totalPrice = 0;

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.totalPrice = this.totalPrice + item.quantity * item.price;
      }
    }

    emptyCart() {
      this.item = [];
      this.totalQuantity = 0;
      this.totalPrice = 0;
    }
  }
  class Item {
    constructor(id, name, price, quantity) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
  }

  const cart = new ShoppingCart();
  /*
const productHead = document.getElementById("product-head");

const productInfo = {
    name: "Test ürün",
    price : 500,
    quantity:3  
};

const priceElement = productHead.querySelector("#price");
const productNameElement = productHead.querySelector("#productName");
const quantityInput = productHead.querySelector("#Quantity");

priceElement.textContent = productInfo.price + "TL";
productNameElement.textContent = productInfo.name;
quantityInput.value = productInfo.quantity;

*/

  cart.additem({
    id: 1,
    name: "test1",
    price: 500,
    quantity: 1,
  });
  cart.additem({
    id: 2,
    name: "test2",
    price: 600,
    quantity: 2,
  });

  function addToCart(name, price, id) {
    console.log("add to cart workıng");
    const cartItemsDiv = document.getElementById("cartItems");
    let cartItem = `
    <div class="cartItem">
      <span>${name}</span>
      <button onclick="${deleteItemFromCart(id)}">sil</button>
    </div>
    `;
    cartItemsDiv.innerHTML += cartItem;
  }
  function deleteItemFromCart(id) {
    let index = cart.items.indexOf((element) => {
      element.id == id;
    });
  }

  console.log("Sepet Ögeleri:", cart.items);

  cart.calculateTotalPrice();
  console.log("Toplam Fiyat:", cart.totalPrice);

  cart.updateQuantity(cart.items[0], 3);
  console.log("Toplam Miktar(güncellenmiş):", cart.totalQuantity);

  cart.removeItem(cart.items);
  console.log("Toplam Fiyat:", cart.totalPrice);

  cart.emptyCart();
  console.log("Toplam Fiyat:", cart.totalPrice);
});

function addToCart(name, price, id) {
    console.log("add to cart workıng");
    const cartItemsDiv = document.getElementById("cartItems");
    let cartItem = `
    <div class="cartItem">
      <span>${name}</span>
      <button onclick="${deleteItemFromCart(id)}">sil</button>
    </div>
    `;
    cartItemsDiv.innerHTML += cartItem;
  }
  function deleteItemFromCart(id) {
    let index = cart.items.indexOf((element) => {
      element.id == id;
    });
  }