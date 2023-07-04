import { log } from './ralph-module-klaviyo.utils';
const moduleOptions = `<%= JSON.stringify(options) %>`;

export default function(app, inject) {
  const options = JSON.parse(moduleOptions);

  // This will make all your module options available through your modules name, for example `this.$ralphModule` in all your components
  inject(options.name, options);

  console.log(options);

  // Register Vuex store module for this module
  app.store.registerModule(options.name, {
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {}
  });

  const addedToCart = (data) => {
    const { item, product } = data
    if (typeof window !== 'undefined') {
      const _learnq = window._learnq || []
      const itemAdded = {
        Name: product.alias,
        ProductId: item.skuId,
        // ImageURL: ,
        URL: `${window.location.origin}${data.product.canonicalUrl}`,
        Brand: product.brand.name,
        // Price: ,
      }  
      _learnq.push(['track', 'Added to Cart', itemAdded])
    }
  }

  const viewedProduct = () => {
    if (typeof window !== 'undefined') {
      const _learnq = window._learnq || []
      const productViewed = {
        Name: product.alias,
        ProductId: item.skuId,
        // ImageURL: ,
        URL: `${window.location.origin}${data.product.canonicalUrl}`,
        Brand: product.brand.name,
        // Price: ,
      }  
      _learnq.push(['track', 'Viewed Product', productViewed])
      _learnq.push(['trackvieweditem', {
        // Title: ,
        // ItemId: ,
        // Categories: ,
        // ImageUrl: ,
        // Url: ,
        // Metadata: {
        //   Brand: ,
        //   Price: ,
        //   CompareAtPrice: item.CompareAtPrice
        // }
      }])
    }
  }

  const setCustomer = (email) => {
    if (typeof window !== 'undefined') {
      const _learnq = window._learnq || []
      console.log('vidar customer', email)
      if (email) {
        _learnq.push([
          'identify',
          {
            $email: email
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

      // Example of how to listen to ralph event
      if (eventType === 'cart:add') {
        log('Cart add event received', eventData);
        log('Current state', state);
        addedToCart(eventData)
      }

      if (eventType === 'user:login' || eventType === 'user:register') {
        log('User login/register event received', eventData);
        log('Current state', state);
        setCustomer(eventData)
      }

      if (eventType === 'newsletter:subscribe') {
        const {email} = eventData
        log('Newsletter event received', eventData);
        log('Current state', state);
        setCustomer(email)
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
