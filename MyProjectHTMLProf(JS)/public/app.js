const API_URL = 'http://localhost:3000';

Vue.component('topNav', {
    template: `
        <nav class="topNav">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Men</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Women</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Kids</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Accoseriese</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Featured</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Hot Deals</a>
                </li>
            </ul>
        </nav>
    `
});

Vue.component('Footer', {
    template: `
        <footer class="container">
            <div class="row footerWrap">
                <div class="col-lg-5 col-md-12 footerBrand">
                    <div class="logo">
                        BRAN<span>D</span>
                    </div>
                    <div class="footerBrandText1">
                        Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate
                        multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of
                        processes and cross-unit partnerships.
                    </div>
                    <div class="footerBrandText2">
                        Efficiently plagiarize 24/365 action items and focused infomediaries.
                        Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.
                    </div>
                </div>
                <section class="col-lg-2 col-md-12 footerColumn">
                    <h2>COMPANY</h2>
                    <nav>
                        <a href="">Home</a>
                        <a href="">Shop</a>
                        <a href="">About</a>
                        <a href="">How It Works</a>
                        <a href="">Contact</a>
                    </nav>
                </section>
                <section class="col-lg-2 col-md-12 footerColumn">
                    <h2>INFORMATION</h2>
                    <nav>
                        <a href="">Tearms & Condition</a>
                        <a href="">Privacy Policy</a>
                        <a href="">How to Buy</a>
                        <a href="">How to Sell</a>
                        <a href="">Promotion</a>
                    </nav>
                </section>
                <section class="col-lg-2 col-md-12 footerColumn">
                    <h2>SHOP CATEGORY</h2>
                    <nav>
                        <a href="">Men</a>
                        <a href="">Women</a>
                        <a href="">Child</a>
                        <a href="">Apparel</a>
                        <a href="">Browse All</a>
                    </nav>
                </section>
            </div>
        </footer>
    `
});

Vue.component('product-item', {
    props: ['item'],
    template: `
        <div>
            <div class="productUnitImgWrap">
                <div class="productUnitBuy">
                    <button @click="handleBuyClick(item)">
                        <img src="images/addToCart.png" alt="">
                        Add to Cart
                    </button>
                </div>
                <img :src="item.image" alt="img">
            </div>
            <div class="productName"> {{ item.name }} </div>
            <div class="productPrice"> {{ item.price | currency }} </div>
        </div>
    `,
    methods: {
        handleBuyClick(item) {
            this.$emit('onBuy', item);
        }
    }
});

Vue.component('products', {
    props: ['query'],
    template: `
        <div>
            <div class="row productUnitContent" v-if="filteredItems.length">
                <product-item class="col-lg-3 col-md-4 col-sm-6 productUnit" v-for="item in filteredItems" @onBuy="handleBuyClick" :item="item"><product-item>
            </div>
            <div v-if="!filteredItems.length" class="empty">Ничего не найдено</div>
        </div>    
    `,
    data() {
        return {
            items: [],
        }
    },
    methods: {
        handleBuyClick(item) {
            this.$emit('onbuy', item);
        }
    },
    computed: {
        filteredItems() {
            const regexp = new RegExp(this.query, 'i');
            return this.items.filter((item) => regexp.test(item.name))
        },
    },
    mounted() {
        fetch(`${API_URL}/goods`)
        .then((response) => response.json())
        .then((items) => {
            this.items = items;
        });
    }
});

Vue.component('search', {
    template: `
        <form class="searchWrap">
            <div class="searchBrowse">
                Browse <i class="fas fa-caret-down"></i>
            </div>
            <input type="text" v-model.trim="searchQuery" placeholder="Search for Item...">
            <button @click.prevent="hendleSearchClick">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
    data() {
        return {
            searchQuery: '',
        };
    },
    methods: {
        hendleSearchClick() {
            this.$emit('onsearch', this.searchQuery);
        }
    }
});

Vue.filter('currency', function(value, symbol, count) {
    var symbol = symbol || '$'
    var count = count || 2
    
    return symbol + value.toFixed(count)
});

Vue.component('cart', {
    props: ['cart', 'total', 'cartItemCount'],
    template:`
    <div class="container shoppingCartContainer">
        <div class="shoppingCartWrap" id="cartList" v-if="cart.length">
            <div class="shoppingHeadProductWrap">
                <div class="shoppingCartHead">PRODUCT DETAILS</div>
                <div class="shoppingCartHead"></div>            
                <div class="shoppingCartHead">UNITE PRICE</div>
                <div class="shoppingCartHead">QUANTITY</div>
                <div class="shoppingCartHead">SHIPPING</div>
                <div class="shoppingCartHead">SUBTOTAL</div>
                <div class="shoppingCartHead">ACTION</div>
            </div>
            <div v-for="item in cart">
                <div class="shoppingDescProductWrap">
                    <img :src="item.image" alt="img"/>
                    <div class="productCartPrice productCart">
                        <div class="productCartName"> {{ item.name }} </div>
                        <div class="productCartDetails">
                            <div class="productCartDetailsTop"> Color: <span>{{ item.color }}</span> </div>
                            <div class="productCartDetailsBottom"> Size: <span>{{ item.size }}</span> </div>
                        </div>
                    </div>
                    <div class="productCartPrice">{{ item.price | currency }} </div>
                    <div class="productCartPrice"> {{ item.quantity }} </div>
                    <div class="productCartPrice">FREE</div>
                    <div class="productCartPrice">{{ item.subtotal = item.price * item.quantity | currency }}</div>
                    <button class="productCartPrice" @click="handleDeleteClick(item)"><i class="fas fa-times-circle"></i></button>
                </div>
            </div>
        </div>
        <h3 class="total" v-if="!cart.length">Корзина пуста</h3>
        <div class="row shoppingCartBtnWrap">
            <div class="col-sm-6 col-xs-12 productCartBtnLeft">
                <button class="cartBtnLeft"> CLEAR SHOPPING CART </button>
            </div>
            <div class="col-sm-6 col-xs-12 productCartBtnRight">
                <button class="cartBtnRight"> CONTINUE SHOPPING </button>
            </div>
        </div>
    </div>
    `,
    methods: {
        handleDeleteClick(item) {
            this.$emit('ondelete', item);
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        cart: [],
        searchQuery: '',
        total: 0,
        showSearch: false
    },
    mounted() {
        fetch(`${API_URL}/cart`)
            .then((response) => response.json())
            .then((result) => {
                this.cart = result.items;
                this.total = result.total;
            });
    },
    methods: {
        handleSearch(query) {
            this.searchQuery = query;
            this.showSearch = this.showSearch ? false : true;
        },
        handleDeleteClick(item) {
            if(item.quantity > 1) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({quantity: item.quantity - 1})
                }).then((response) => response.json())
                .then((result) => {
                    const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                    Vue.set(this.cart, itemIdx, result.item);
                    this.total = result.total;

                });
            } else {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'DELETE',
                }).then((response) => response.json())
                .then((result)=> {
                    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
                    this.total = result.total;
                });
            }
        },
        handleBuyClick(item) {
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
            if(cartItem) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({quantity: cartItem.quantity + 1})
                }).then((response) => response.json())
                .then((result) => {
                    const itemIdx = this.cart.findIndex(cartItem => cartItem.id === item.id);
                    Vue.set(this.cart, itemIdx, result.item);
                    this.total = result.total;
                });
            } else {
                fetch(`${API_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({...item, quantity: 1}),
                }).then((response) => response.json())
                    .then((result) => {
                    this.cart.push(result.item);
                    this.total = result.total;
                });
            }
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.reduce((acc, item) => acc + item.quantity, 0);
        }
    }
});