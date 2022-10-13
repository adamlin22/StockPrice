# StockPrice

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Requirements`

The task is to implement a React component named StockPriceExplorer and a JavaScript or TypeScript class named StockPrices, as one might implement as part of a hypothetical application that utilizes historical stock prices.  Please use whichever of the two languages (JavaScript or TypeScript) is most comfortable for you; both are equally valid from the standpoint of Inductor’s process.

 

 

Part 1 (StockPriceExplorer React component):

 

Please implement a React component (in either JavaScript or TypeScript) named StockPriceExplorer, with the behavior specified below.

 

The StockPriceExplorer component should take the following props:

dates: An array of strings giving dates in “month/day/year” format (years are denoted with four digits).  For example: [“1/17/2014”, “1/21/2014”, “1/22/2014”].

prices: An object mapping a set of (string-valued) stock ticker symbols (i.e., stock names such as “AAPL” or “MSFT”) to corresponding arrays of prices.  Each price array is guaranteed to have the same length as dates and contain the price of the corresponding stock ticker symbol on each date in dates, or null for any dates on which the stock ticker symbol does not have a price.  For example: {AAPL: [19.31, 19.61, 19.7], MSFT: [36.38, null, 35.93]}.

 

Given the above props, the StockPriceExplorer component should occupy the full width of its containing component, with left and right margins of 30px and top and bottom margins of 50px, and display the following:

A centered heading containing the text "Stock Data"

Below the heading, the component should display two columns:

The leftmost column should display, for each stock symbol in the prices prop in ascending alphabetical order, a line displaying a checkbox followed by the stock symbol.  The stock symbols for any selected checkboxes should be displayed in red and boldface.

If one or more checkboxes are selected, the righthand column should display the price data for all of the selected stock ticker symbols in a table having the following structure:

The first row should display column headers in boldface, and each subsequent row should display stock price data for a single date.

The first column should display the date for each row, with column header “Date”.  Date values should be left justified within their column.

Each subsequent column should display the price of one of the selected stock symbols on each row’s date, with column header being the stock symbol.  Price values should be centered within their column.

Rows should be ordered by increasing date.

All columns after the initial date column should be displayed in ascending alphabetical order of stock ticker symbol.

 

 

Part 2 (StockPrices class):

 

Please implement a JavaScript or TypeScript class named StockPrices as described below.

 

The constructor for the StockPrices class should accept an array of objects having the following semantics:

Each object gives the prices for a set of stock ticker symbols on a single date.

Each object has a field named "date" giving the object’s corresponding date as a string in "month/day/year" format (year will have four digits).

All other fields on the object map a stock ticker symbol to its corresponding price on that date.

An example object: {MSFT: 36.38, AMZN: 19.98, date: "1/17/2014"}

You can assume that no dates will be repeated within an array passed to the constructor.  Please see the bottom of this email for an example of an array that could be passed to the constructor (e.g., you should be able to call `new StockPrices(examplePrices)`).

 

The StockPrices class should expose the following method:

getPricesMultiple

Should take as arguments an array of string-valued stock ticker symbols, as well as optionally a start date and optionally an end date.

Should return an object containing the following fields:

dates: An array of the dates appearing in the array passed to the constructor, in increasing order.  If either start or end dates are provided to getPricesMultiple as arguments, then this dates array should only contain dates between the start and end dates, inclusive.

prices: An object mapping each (string-valued) stock ticker symbol provided in the method arguments to a corresponding array of prices.  Each price array should have the same length as dates and contain the price of the corresponding stock ticker symbol on each date in dates, or null for any dates on which the stock ticker symbol does not appear in the array passed to the constructor.

If any specified stock ticker symbol does not appear in the array passed to the constructor, then this method should throw an exception.

 

----------------

 

 

The following is an example of an array that could be passed to the StockPrices constructor (e.g., you should be able to call `new StockPrices(examplePrices)`).

 

const examplePrices = [

    {AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014"},

    {AAPL: 19.61, MSFT: 36.17, AMZN: 20.35, date: "1/21/2014"},

    {MSFT: 36.38, AMZN: 19.98, date: "1/17/2014"},

    {AAPL: 19.79, MSFT: 36.89, AMZN: 19.79, date: "1/16/2014"},

    {AAPL: 19.91, AMZN: 19.79, date: "1/15/2014"},

    {AAPL: 19.51, MSFT: 35.78, AMZN: 19.88, date: "1/14/2014"}

];
