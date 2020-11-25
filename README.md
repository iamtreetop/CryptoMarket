## CryptoMarket

[CryptoMarket Live](https://github.com/iamtreetop/CryptoMarket/)

### Background

CryptoMarket is a data visualization tool displaying cryptocurrency prices fetched from an external API in real time.

### Functionality & MVP  

Users will be able to:
- [ ] Open and close introductory
- [ ] Search cryptocurrencies in search bar
- [ ] Interact with chart

Potential additional features:
- [ ] Display cryptocurrency news from a secondary API
- [ ] A production Readme

### Wireframes

This app will consist of a single screen in the center with an interactive chart displayed. There is a search bar at the top of the page for users to find. Links to my Github and LinkedIn will be found on the bottom left corner. The sound control will be included in the right side bar as well.

![wireframes](https://github.com/iamtreetop/fyuz-em/blob/main/assets/images/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:
- Vanilla JS
- D3
- CSS
- Coinmarketcap API
- Webpack

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up. Create `webpack.config.js` as well as `package.json`. Write a basic entry file and the bare bones of any scripts needed.  Research any potential libraries to have for the app.

- Get `webpack` working
- Research Day; Learn D3 

**Day 2**: First, use `cryptomarket.js` to build the environment layout.

- Render a sample graph, environment to `cryptomarket.js`; Be able to see the sample graph on screen
- Grab data from 3rd party API; Make sure to grab correct data

**Day 3**: Be able to render the graph screen; Begin search function

- Implement 3rd party data and display graph accordingly
- Style graph
- Build search function

**Day 4**: Finalize search function to display correct graphs; Add hover affect to graphs

- Be able to toggle between different graphs
- Be able to display correct prices dependant on hover

**Day 5**: Polish styling; Stress test

- Make application presentable
- Walk through every function of application and stress test

### Bonus features
Some features this applcation can include in the future:
- [ ] Add news index for each cryptocurrency
