export type PricesType = Record<string, Array<number | null>>;
export type GetPricesMultipleResponseType = {
  dates: string[];
  prices: PricesType;
};

/**
 * Get yyyy-MM-dd from M/d/yyyy
 */
export const getStandardDate = (date: string): string => {
  const elements = date
    .split("/")
    .map((el) => ([2, 4].includes(el.length) ? el : `0${el}`));

  return `${elements[2]}-${elements[0]}-${elements[1]}`;
};

export interface IStockPrices {
  dates: string[];
  prices: PricesType;

  getPricesMultiple: (
    stockSymbols: string[],
    startDate?: string,
    endDate?: string
  ) => GetPricesMultipleResponseType;
}

export default class StockPrices implements IStockPrices {
  dates: string[] = [];
  prices: PricesType = {};

  constructor(priceList: Array<Record<string, string | number | undefined>>) {
    const tempDates: typeof this.dates = [];
    const tempPrices: typeof this.prices = {};

    const symbols: string[] = [];

    priceList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key === "date") {
          tempDates.push(item[key] as string);
        } else {
          if (!symbols.includes(key)) symbols.push(key);
        }
      });
    });

    tempDates.sort(
      (a, b) =>
        new Date(getStandardDate(a)).getTime() -
        new Date(getStandardDate(b)).getTime()
    );

    tempDates.forEach((date) => {
      const priceItem = priceList.find((item) => item.date === date)!;

      symbols.forEach((symbol) => {
        if (!Array.isArray(tempPrices[symbol])) {
          tempPrices[symbol] = [];
        }

        tempPrices[symbol].push((priceItem[symbol] ?? null) as number | null);
      });
    });

    this.dates = tempDates;
    this.prices = tempPrices;
  }

  getPricesMultiple(
    stockSymbols: string[],
    startDate?: string | null,
    endDate?: string | null
  ): GetPricesMultipleResponseType {
    let startIndex: number = 0;

    const datesLength = this.dates.length;

    if (
      startDate &&
      new Date(getStandardDate(this.dates[0])).getTime() <
        new Date(getStandardDate(startDate)).getTime()
    ) {
      let i = 0;

      for (; i < datesLength - 1; i++) {
        if (
          new Date(getStandardDate(this.dates[i])).getTime() <=
            new Date(getStandardDate(startDate)).getTime() &&
          new Date(getStandardDate(this.dates[i + 1])).getTime() >
            new Date(getStandardDate(startDate)).getTime()
        ) {
          break;
        }
      }

      if (
        new Date(getStandardDate(this.dates[i])).getTime() !==
        new Date(getStandardDate(startDate)).getTime()
      ) {
        i++;
      }

      startIndex = i;
    }

    let endIndex: number = datesLength - 1;

    if (
      endDate &&
      new Date(getStandardDate(this.dates[endIndex])).getTime() >
        new Date(getStandardDate(endDate)).getTime()
    ) {
      let i = endIndex;

      for (; i >= 1; i--) {
        if (
          new Date(getStandardDate(this.dates[i - 1])).getTime() <=
            new Date(getStandardDate(endDate)).getTime() &&
          new Date(getStandardDate(this.dates[i])).getTime() >
            new Date(getStandardDate(endDate)).getTime()
        ) {
          break;
        }
      }

      endIndex = i - 1;
    }

    const result: GetPricesMultipleResponseType = {
      dates: this.dates.slice(startIndex, endIndex + 1),
      prices: {},
    };

    stockSymbols.forEach((symbol) => {
      if (Array.isArray(this.prices[symbol])) {
        result.prices[symbol] = this.prices[symbol].slice(
          startIndex,
          endIndex + 1
        );
      } else {
        throw new Error(`Invalid stock symbol - ${symbol}`);
      }
    });

    return result;
  }
}