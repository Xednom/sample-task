Vue.config.devtools = true;
Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

new Vue({
  el: '#phone',
  delimiters: ['[[', ']]'],
  data() {
    return {
      phones: [],
      contacts: [],
      addresses: [],
      loading: false,
      viewing: false,
      saving: false,
      adding: false,
      paging: false,
      currentPhone: {},
      newPhone: {
        'contact': null,
        'phone': "",
        'phone_type': "",
        'primary': "",
      },
    };
  },
  mounted() {
    this.fetchPhones();
    this.fetchContacts();
  },
  methods: {
    reset: function () {
      Object.keys(this.newPhone).forEach(key => {
        this.newPhone[key] = null
      })
    },
    updatePhones() {
      this.saving = true;
      let endpoint = `/api/v1/phone/${this.currentPhone.id}/`;
      if (this.currentPhone) {
        axios.put(endpoint, this.currentPhone)
          .then((response) => {
            this.saving = false;
            this.currentPhone = response.data;
            this.fetchphones();

          })
          .catch((err) => {
            this.saving = false;
            console.log(err);
          })
      }
    },
    fetchPhones() {
      this.loading = true;
      let endpoint = `/api/v1/phone/`;
      
      if (this.phones) {
        axios.get(endpoint)
          .then((response) => {
            this.phones = response.data;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
      }
    },
    fetchAddresses() {
        this.loading = true;
        let endpoint = `/api/v1/address/`;
        
        if (this.addresses) {
          axios.get(endpoint)
            .then((response) => {
              this.addresses = response.data;
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
    addPhone() {
      this.saving = true;
      this.adding = true;
      if (this.newPhone) {
        axios.post(`/api/v1/phone/`, this.newPhone)
          .then(() => {
            this.reset();
            this.saving = false;

            this.fetchPhones();
          })
          .catch((err) => {
            this.saving = false;
            console.log(err.response);
          })
      }
    },
    fetchPhone(id) {
      this.viewing = true;
      let endpoint = `/api/v1/phone/${id}/`;
      if (this.currentPhone) {
        axios.get(endpoint)
          .then((response) => {
            this.currentPhone = response.data;
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