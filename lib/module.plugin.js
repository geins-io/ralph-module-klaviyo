import { log, cookieConsented} from './ralph-module-klaviyo.utils';
const moduleOptions = `<%= JSON.stringify(options) %>`;

export default function(app, inject) {
  const options = JSON.parse(moduleOptions);

  inject(options.name, options);

  app.store.registerModule(options.name, {
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {}
  });

  const addedToCart = ({item, product}) => {
    if (typeof window !== 'undefined' && cookieConsented()) {
      const klaviyo = window.klaviyo || []
      const itemAdded = {
        Name: product.alias,
        ProductId: item.skuId,
        URL: `${window.location.origin}${product.canonicalUrl}`,
        Brand: product.brand.name,
      }  
      klaviyo.push(['track', 'Added to Cart', itemAdded])
    }
  }

  const startedCheckout = (data) => {
    if (typeof window !== 'undefined' && cookieConsented()) {
      const klaviyo = window.klaviyo || []
      const itemsInCart = data.__ob__.dep.subs[0].value.cart.data.items
      log('Checkout started', data)
      log('Items in cart', itemsInCart)
      const checkoutStarted = {
        name: 'test',
      }
      klaviyo.push(['track', 'Started Checkout', checkoutStarted])
    }
  }

  const viewedProduct = ({product}) => {
    if (typeof window !== 'undefined' && cookieConsented()) {
      const klaviyo = window.klaviyo || []
      const productViewed = {
        Name: product.alias,
        URL: `${window.location.origin}${product.canonicalUrl}`,
        Brand: product.brand.name,
      }  
      klaviyo.push(['track', 'Viewed Product', productViewed])
      klaviyo.push(['trackViewedItem', productViewed])
    }
  }

  const setCustomer = (email) => {
    if (typeof window !== 'undefined' && cookieConsented()) {
      const klaviyo = window.klaviyo || []
      if (email || email !== "") {
        klaviyo.push(['identify', {
          $email: email,
        }
        ])
      }
    }
  }

  // Listen to events in ralph and take action
  app.store.subscribe((mutation, state) => {
    if (mutation.type === 'events/push') {
      const eventType = mutation.payload.type;
      const eventData = mutation.payload.data;

      switch (eventType) {
        case 'cart:add': 
          log('Cart add event received', eventData);
          addedToCart(eventData);
          break;
      
        case 'product:click':
          log('Product click', eventData);
          viewedProduct(eventData);
          break;
      
        case 'product-detail:impression':
          log('Product detail impression', eventData);
          viewedProduct(eventData);
          break;
      
        case 'user:login':
          log('User login event received', eventData);
          setCustomer(eventData.__ob__?.dep.subs[0]?.value?.auth?.user);
          break;
      
        case 'user:register':
          log('User register event received', eventData);
          setCustomer(eventData.__ob__?.dep.subs[0]?.value?.auth?.user);
          break;
      
        case 'newsletter:subscribe':
          log('Newsletter event received', eventData);
          setCustomer(eventData.email);
          break;

        case 'checkout:impression':
          log('Checkout impression', eventData);
          startedCheckout(eventData);
          break;
      
        case 'checkout:purchase':
          log('Checkout purchase', eventData);
          // setCustomer(eventData.checkout.email);
          break;

        case 'customer-type:change':
          // Här borde vi kolla om kund har uppdaterat sina uppgifter, lagt till telefonnummer, etc.
          break;
      }

      // All events sent by ralph since version 19.1.0
      // ------------------------------------------------
      // `widget:click` - data payload: `{ href }`
      // `menu:click` - data payload: `{ item }`
      // `search:click` - data payload: `{ type, data }`

      // All events sent by ralph since version 19.0.0
      // ------------------------------------------------
      // `cart:add` - data payload: `{ item, product }`
      // `cart:remove` - data payload: `{ item, product }`
      // `page:impression` - data payload: `{ route }`
      // `product:click` - data payload: `{ product, page, index, pageSize }`
      // `product:impression` - data payload: `{ product, page }`
      // `product-detail:impression` - data payload: `{ product }`
      // `favorite:add` - data payload: `{ productId, product }`
      // `favorite:remove` - data payload: `{ productId, product }`
      // `checkout:impression` - data payload: `{}`
      // `checkout:update` - data payload: `{ checkout }`
      // `checkout:purchase` - data payload: `{ order }`
      // `user:login` - data payload: `{}`
      // `user:logout` - data payload: `{}`
      // `user:register` - data payload: `{}`
      // `user:password-reset` - data payload: `{ email, resetKey }`
      // `user:delete` - data payload: `{}`
      // `newsletter:subscribe` - data payload: `{ email }`
    }
  });
}
