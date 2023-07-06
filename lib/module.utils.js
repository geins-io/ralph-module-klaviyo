const moduleOptions = `<%= JSON.stringify(options) %>`
const logStyle =
  'background-color: #FFFAF3; padding: 2px 5px; border-radius: 5px; font-weight: bold; border: 1px solid #131313; color: #131313;'
export function log(...args) {
  const options = JSON.parse(moduleOptions)
  // eslint-disable-next-line no-console
  console.log('%c' + options.nameShort, logStyle, ...args)
}

export function cookieConsent() {
  const cookies = document.cookie.split(';')
  const consentCookie = cookies.find(cookie => cookie.includes('ralph-cookie-consent'))
  if (consentCookie) {
    return consentCookie.split('=')[1] === 'true'
  } else {
    return false
  }
}

export const addedToCart = ({ item, product }) => {
  if (typeof window !== 'undefined' && cookieConsent()) {
    const klaviyo = window.klaviyo || []
    const itemAdded = {
      Name: product.alias,
      ProductId: item.skuId,
      Brand: product.brand.name,
    }
    klaviyo.push(['track', 'Added to Cart', itemAdded])
  }
}

export const startedCheckout = (data) => {
  if (typeof window !== 'undefined' && cookieConsent()) {
    const klaviyo = window.klaviyo || []
    const itemsInCart = data.__ob__.dep.subs[0].value.cart.data.items
    const mapped = itemsInCart.map(item => { 
      let obj = {
        Name: item.product.alias,
        ProductId: item.skuId,
        Brand: item.product.brand.name
      }
      return obj
    })
    const checkoutStarted = {
      Items: mapped,
    }
    klaviyo.push(['track', 'Started Checkout', checkoutStarted])
  }
}

export const viewedProduct = ({ product }) => {
  if (typeof window !== 'undefined' && cookieConsent()) {
    const klaviyo = window.klaviyo || []
    const productViewed = {
      Name: product.alias,
      Brand: product.brand.name,
    }
    klaviyo.push(['track', 'Viewed Product', productViewed])
    klaviyo.push(['trackViewedItem', productViewed])
  }
}

export const setCustomer = (email) => {
  if (typeof window !== 'undefined' && cookieConsent()) {
    const klaviyo = window.klaviyo || []
    if (email || email !== "") {
      klaviyo.push(['identify', {
        $email: email,
      }
      ])
    }
  }
}