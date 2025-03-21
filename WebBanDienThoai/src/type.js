//nút tất cả
function allButton(){
    var allButton = document.querySelector(".node[href='#All']");

    allButton.onclick = function(){
        //Lấy tất cả danh sách sản phẩm
        var products = document.querySelectorAll(".product");

        //Hiển thị tất cả sản phẩm
        products.forEach(function(product){
            product.style.display = 'block';
        });
    }
}

//hàm nút bấm Iphone
function iphoneButton(){
    var ipButton = document.querySelector(".node[href='#Iphone']");
    var allProducts = document.querySelectorAll('.product');

    ipButton.onclick = function(){
        allProducts.forEach(function(product) {
            if(product.classList.contains('iphone')) {
                // Hiển thị sản phẩm iPhone
                product.style.display = 'block';
            } else {
                // Ẩn các sản phẩm không phải là iPhone
                product.style.display = 'none';
            }
        });
    }
}

//Hàm nút bấm Samsung
function samsungButton(){
    var ssButton = document.querySelector(".node[href='#Samsung']");
    var allProducts = document.querySelectorAll('.product');

    ssButton.onclick = function(){
        allProducts.forEach(function(product){
            if(product.classList.contains('samsung')){
                product.style.display = 'block';
            }else{
                product.style.display = 'none';
            }
        });
    }
}

//Hàm nút bấm oppo
function oppoButton(){
    var oppoButton = document.querySelector(".node[href='#Oppo']");
    var allProducts = document.querySelectorAll('.product');

    oppoButton.onclick = function(){
        allProducts.forEach(function(product){
            if(product.classList.contains('oppo')){
                product.style.display = 'block';
            }else{
                product.style.display = 'none';
            }
        });
    }
}

//Hàm nút bấm Realme
function realmeButton(){
    var realmeButton = document.querySelector(".node[href='#Realme']");
    var allProducts = document.querySelectorAll('.product');

    realmeButton.onclick = function(){
        allProducts.forEach(function(product){
            if(product.classList.contains('realme')){
                product.style.display = 'block';
            }else{
                product.style.display = 'none';
            }
        });
    }
}

//Hàm nút bấm Nokia
function nokiaButton(){
    var nokiaButton = document.querySelector(".node[href='#Nokia']");
    var allProducts = document.querySelectorAll('.product');

    nokiaButton.onclick = function(){
        allProducts.forEach(function(product){
            if(product.classList.contains('nokia')){
                product.style.display = 'block';
            }else{
                product.style.display = 'none';
            }
        });
    }
}

//Hàm nút bấm Xiaomi
function xiaomiButton(){
    var xiaomiButton = document.querySelector(".node[href='#Xiaomi']");
    var allProducts = document.querySelectorAll('.product');

    xiaomiButton.onclick = function(){
        allProducts.forEach(function(product){
            if(product.classList.contains('xiaomi')){
                product.style.display = 'block';
            }else{
                product.style.display = 'none';
            }
        });
    }
}

//hàm sắp xếp sản phẩm tăng dần theo giá tiền
$(document).ready(function(){
    $(".fa-sort-up").click(function(){
        // Lấy tất cả các sản phẩm và chuyển chúng thành một mảng để thực hiện việc sắp xếp
        var products = $(".product");
        // Sắp xếp mảng sản phẩm dựa trên giá
        products.sort(function(a, b){
            let priceA = parseFloat($(a).find('.price').text().replace('VND','').replace(/\./g,'').trim());
            let priceB = parseFloat($(b).find('.price').text().replace('VND','').replace(/\./g,'').trim());
            return priceA - priceB;
        });
        // Gắn lại các sản phẩm đã được sắp xếp vào vị trí ban đầu trong DOM
        $(".content").empty().append(products);
    });
});

//hàm sắp xếp giảm dần theo giá tiền
$(document).ready(function(){
    $(".fa-sort-down").click(function(){
        var products = $(".product");

        //sap xep mang dua tren gia
        products.sort(function(a,b){
            let priceA = parseFloat($(a).find('.price').text().replace('VND','').replace(/\./g,'').trim());
            let priceB = parseFloat($(b).find('.price').text().replace('VND','').replace(/\./g,'').trim());
            return priceB - priceA;
        });
        $(".content").empty().append(products);
    });
});

// Sử dụng jQuery để xử lý sự kiện khi nhấp vào nút "Thêm vào giỏ hàng" hoặc "Thêm vào yêu thích"
$('.add-to-cart-btn, .add-to-favorite-btn').click(function(){
    // Lấy thông tin sản phẩm
    var productContainer = $(this).closest('.product');
    var productName = productContainer.find('h3').text();
    var productPrice = productContainer.find('.price').text();
    var productImage = productContainer.find('img').attr('src');

    // Kiểm tra xem người dùng nhấp vào nút nào
    var isAddToCart = $(this).hasClass('add-to-cart-btn');

    // Thêm sản phẩm vào giỏ hàng hoặc yêu thích  lưu thông tin sản phẩm vào Local Storage
    var key = isAddToCart ? 'cart' : 'favorite';
    var items = JSON.parse(localStorage.getItem(key)) || [];
    var product = {
        name: productName,
        price: productPrice,
        image: productImage,   
    };
    items.push(product);
    localStorage.setItem(key, JSON.stringify(items));

    // Hiển thị thông báo tương ứng
    var notificationMessage = isAddToCart ? 'Đã thêm vào giỏ hàng' : 'Đã thêm vào yêu thích';
    $('.notification').text(notificationMessage).fadeIn().delay(2000).fadeOut();
});

// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart() {
    // Xử lý sự kiện khi nhấp vào nút "Thêm vào giỏ hàng"
    $('.add-to-cart-btn').click(function() {
        // Lấy thông tin sản phẩm
        var productElement = $(this).closest('.product');
        var productName = productElement.find('h3').text();
        var productPrice = productElement.find('.price').text(); // Lấy giá sản phẩm
        var productImage = productElement.find('img').attr('src'); // Lấy đường dẫn hình ảnh sản phẩm

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var existingProductIndex = cart.findIndex(function(item) {
            return item.name === productName;
        });

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng lên 1
            cart[existingProductIndex].quantity++;
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
            var product = {
                name: productName,
                price: productPrice, // Thêm giá sản phẩm vào đối tượng sản phẩm
                image: productImage, // Thêm đường dẫn hình ảnh sản phẩm vào đối tượng sản phẩm
                quantity: 1
            };
            cart.push(product);
        }

        // Lưu thông tin giỏ hàng vào Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Hiển thị thông báo thành công
        $('.notification').text('Đã thêm vào giỏ hàng').fadeIn().delay(2000).fadeOut();

        // Ngăn chặn sự kiện mặc định của nút (ví dụ: chuyển hướng trang)
        return false;
    });
}

// Hàm để hiển thị mặt hàng trong giỏ hàng
function displayCartItems() {
    // Lấy danh sách sản phẩm từ Local Storage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItemsContainer = document.getElementById('cartItemsContainer');

    // Xóa nội dung cũ trong cartItemsContainer
    cartItemsContainer.innerHTML = '';

    // Duyệt qua từng sản phẩm trong giỏ hàng và hiển thị
    cart.forEach(function(item) {
        var cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                <div class="item-info" style="font-family: Arial, Helvetica, sans-serif;">
                    <h3>${item.name}</h3>
                    <span class="price" style="color: red;">${item.price}</span>
                    <span class="quantity">Số lượng: ${item.quantity}</span>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}
// Gọi hàm để hiển thị danh sách yêu thích khi trang được tải
$(document).ready(function() {
    displayCartItems();
});

// Hàm để thêm sản phẩm vào danh sách yêu thích
function addToFavorite() {
    // Xử lý sự kiện khi nhấp vào nút "Thêm vào yêu thích"
    $('.add-to-favorite-btn').click(function() {
        // Lấy thông tin sản phẩm
        var productElement = $(this).closest('.product');
        var productName = productElement.find('h3').text();
        var productPrice = productElement.find('.price').text(); // Lấy giá sản phẩm
        var productImage = productElement.find('img').attr('src'); // Lấy đường dẫn hình ảnh sản phẩm

        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
        var favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        var existingProductIndex = favorite.findIndex(function(item) {
            return item.name === productName;
        });

        if (existingProductIndex === -1) {
            // Nếu sản phẩm chưa tồn tại trong danh sách yêu thích, thêm mới vào danh sách yêu thích
            var product = {
                name: productName,
                price: productPrice, // Thêm giá sản phẩm vào đối tượng sản phẩm
                image: productImage, // Thêm đường dẫn hình ảnh sản phẩm vào đối tượng sản phẩm
                quantity: 1
            };
            favorite.push(product);
        }

        // Lưu thông tin danh sách yêu thích vào Local Storage
        localStorage.setItem('favorite', JSON.stringify(favorite));

        // Hiển thị thông báo thành công
        $('.notification').text('Đã thêm vào yêu thích').fadeIn().delay(2000).fadeOut();

        // Ngăn chặn sự kiện mặc định của nút (ví dụ: chuyển hướng trang)
        return false;
    });
}

// Hàm để hiển thị mặt hàng trong danh sách yêu thích
function displayFavoriteItems() {
    // Lấy danh sách sản phẩm từ Local Storage
    var favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    var favoriteItemsContainer = document.getElementById('favoriteItemsContainer');

    // Xóa nội dung cũ trong favoriteItemsContainer
    favoriteItemsContainer.innerHTML = '';

    // Duyệt qua từng sản phẩm trong danh sách yêu thích và hiển thị
    favorite.forEach(function(item) {
        var favoriteItemHTML = `
            <div class="favorite-item">
                <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                <div class="item-info" style="font-family: Arial, Helvetica, sans-serif;">
                    <h3>${item.name}</h3>
                    <span class="price" style="color: red;">${item.price}</span>
                    <span class="quantity">Số lượng: ${item.quantity}</span>
                </div>
            </div>
        `;
        favoriteItemsContainer.insertAdjacentHTML('beforeend', favoriteItemHTML);
    });
}
// Gọi hàm để hiển thị danh sách yêu thích khi trang được tải
$(document).ready(function() {
    displayFavoriteItems();
});


// Gọi hàm 
allButton();
iphoneButton();
samsungButton();
oppoButton();
realmeButton();
nokiaButton();
xiaomiButton();
addToCart();
addToFavorite();
document.querySelector('#sortUp').addEventListener('click', sortUp); //nút tăng dần
document.querySelector('#sortDown').addEventListener('click', sortDown); // nút giảm dần

