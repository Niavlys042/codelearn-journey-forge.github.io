
import { useState } from 'react';
import { CURRENCY_RATES } from '@/utils/config';

type CurrencyCode = 'EUR' | 'MGA' | 'USD';

interface UseCurrencyProps {
  defaultCurrency?: CurrencyCode;
}

export function useCurrency({ defaultCurrency = 'MGA' }: UseCurrencyProps = {}) {
  const [currency, setCurrency] = useState<CurrencyCode>(defaultCurrency);

  const convertEuroToMGA = (amount: number): number => {
    return amount * CURRENCY_RATES.EUR_TO_MGA;
  };

  const convertUSDToMGA = (amount: number): number => {
    return amount * CURRENCY_RATES.USD_TO_MGA;
  };

  const formatCurrency = (amount: number, currencyCode: CurrencyCode = currency): string => {
    switch (currencyCode) {
      case 'EUR':
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(amount);
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      case 'MGA':
        // Format en MGA (Ariary) sans symbole de devise
        return `${amount.toLocaleString('fr-FR')} Ar`;
      default:
        return amount.toString();
    }
  };

  return {
    currency,
    setCurrency,
    convertEuroToMGA,
    convertUSDToMGA,
    formatCurrency
  };
}
