export const RoutesConfig = {
  root: '/',
  product: {
    productList: { path: '', fullPath: '/products'  }
  },
  relation: {
    relationList: { path: '', fullPath: '/relations'  }
  },
  quotation: {
    quotationList: { path: '', fullPath: '/quotations'  }
  },
  settings: {
    landing: { path: '', fullPath: '/settings'  },
    vatSettings: { path: 'vat', fullPath: '/settings/vat'  },
    productCategory: { path: 'product-category', fullPath: '/settings/product-category'  },
    productUnit: { path: 'product-unit', fullPath: '/settings/product-unit'  }
  }
}
