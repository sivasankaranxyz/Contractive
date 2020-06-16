import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import web3 from './contracts/web3';
import contract from './contracts/contractInstance';

Vue.config.productionTip = false

// Vue instance
new Vue({
  vuetify,
  data: {
    currentPosts: [],
    currentAccount: '',
    loading: true,
    contract,
  },
  /**
   * calls functions for getting
   * account & current posts.
   */
  async created() {
    await this.updateAccount();
    await this.getPosts();
  },
  transformToRequire: {
    signimg: 'src',
    image: 'xlink:href',
  },
  methods: {
    /**
     * gets current account on web3 and
     * store it on currentAccount variable.
     */
    async updateAccount() {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      this.currentAccount = account;
    },
    /**
     * using the Smart Contract instance:
     * getCounter() - gets the length of total posts
     * getHash() - gets the contracttitle, contracttext and signimg hashes using an index
     *
     * index is from the iteration of the retrieved total
     * post count. every loop gets the hashes and fetches
     * contracttitle, contracttext and signimg hashes using the IPFS gateway URL.
     */
    async getPosts() {
      this.loading = false;
      const posts = [];
      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });

      if (counter !== null) {
        const hashes = [];
        const titles = [];
        const captions = [];
        for (let i = counter; i >= 1; i -= 1) {
          hashes.push(contract.methods.getHash(i).call({
            from: this.currentAccount,
          }));
        }

        const postHashes = await Promise.all(hashes);

        for (let i = 0; i < postHashes.length; i += 1) {
          titles.push(fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].contracttitle}`)
            .then(res => res.text()));

          captions.push(fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].contracttext}`)
            .then(res => res.text()));
        }

        const postTitle = await Promise.all(titles);
        const postCaptions = await Promise.all(captions);

        for (let i = 0; i < postHashes.length; i += 1) {
          posts.push({
            id: i,
            key: `key${i}`,
            title: postTitle[i],
            caption: postCaptions[i],
            src: `https://gateway.ipfs.io/ipfs/${postHashes[i].signimg}`,
          });
        }

        this.currentPosts = posts;
        this.loading = false;
      }
    },
  },
  render: h => h(App)
}).$mount('#app')
