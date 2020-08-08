Vue.config.devtools = true;
Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

new Vue({
  el: '#address',
  delimiters: ['[[', ']]'],
  data() {
    return {
      address: [],
      contacts: [],
      loading: false,
      viewing: false,
      saving: false,
      adding: false,
      paging: false,
      currentAddress: {},
      newAddress: {
        'contact': null,
        'address_1': "",
        'address_2': "",
        'city': "",
        'state': "",
        'zip_code': "",
      },
    };
  },
  mounted() {
    this.fectchAddresses();
    this.fetchContacts();
  },
  methods: {
    reset: function () {
      Object.keys(this.newAddress).forEach(key => {
        this.newAddress[key] = null
      })
    },
    updateAddress() {
      this.saving = true;
      let endpoint = `/api/v1/address/${this.currentAddress.id}/`;
      if (this.currentAddress) {
        axios.put(endpoint, this.currentAddress)
          .then((response) => {
            this.saving = false;
            this.currentAddress = response.data;
            this.fectchAddress();

          })
          .catch((err) => {
            this.saving = false;
            console.log(err);
          })
      }
    },
    fectchAddresses() {
      this.loading = true;
      let endpoint = `/api/v1/address/`;
      
      if (this.address) {
        axios.get(endpoint)
          .then((response) => {
            this.address = response.data;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
      }
    },
    fetchContacts() {
        this.loading = true;
        let endpoint = `/api/v1/contact/`;
        
        if (this.contacts) {
          axios.get(endpoint)
            .then((response) => {
              this.contacts = response.data;
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            })
        }
      },
    addAddress() {
      this.saving = true;
      this.adding = true;
      if (this.newAddress) {
        axios.post(`/api/v1/address/`, this.newAddress)
          .then(() => {
            this.reset();
            this.saving = false;

            this.fectchAddress();
          })
          .catch((err) => {
            this.saving = false;
            console.log(err.response);
          })
      }
    },
    fectchAddress(id) {
      this.viewing = true;
      let endpoint = `/api/v1/address/${id}/`;
      if (this.currentAddress) {
        axios.get(endpoint)
          .then((response) => {
            this.currentAddress = response.data;
            this.viewing = false;
          })
          .catch((err) => {
            this.viewing = false;
            console.log(err);
          })
      }
    },
  }
})