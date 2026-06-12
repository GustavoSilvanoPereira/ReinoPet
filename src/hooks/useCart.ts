'use strict';

'use client';

import { useCartContext } from '@/context/CartContext';

export function useCart() {
  return useCartContext();
}
