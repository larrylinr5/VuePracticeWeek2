import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js'

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'larrylinr5',
            page: 'loginPage',
            user: {
                username: 'larrylinr5@gmail.com',
                password: 'larrylinr5'
            },
            products: [],
            tempProduct: {},
            bodyStyle:{
                
            }
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.user)
                //成功
                .then((response) => {
                    const { token, expired } = response.data;
                    // 寫入 cookie token
                    // expires 設置有效時間
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    //存放token 只需要設定一次
                    const tempToken = document.cookie.replace(/(?:(?:^|.*;\s*)larryToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                    //axios預設headers
                    axios.defaults.headers.common['Authorization'] = token;

                    //this.getProducts()

                    //切換頁面
                    this.page = 'productPage'

                    return this.getProducts()
                })
                //失敗
                .catch((error) => {
                    alert(error.data.message);
                });
        },
        //取得後臺產品列表
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                // 成功的結果
                .then(res => {
                    //console.log('res>',res.data.products)
                    this.products = res.data.products
                })
                // 失敗的結果
                .catch(error => {
                    console.dir('error>>>', error)
                })
        },
        checkDetail(product) {
            this.tempProduct = product
        }
    },
    computed: {

    }
})

app.mount('#app');