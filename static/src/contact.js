Vue.config.devtools = true;
Vue.http.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

new Vue({
  el: '#contact',
  delimiters: ['[[', ']]'],
  data() {
    return {
      contacts: [],
      loading: false,
      viewing: false,
      saving: false,
      adding: false,
      paging: false,
      currentContact: {},
      newContact: {
        'first_name': "",
        'middle_name': "",
        'last_name': "",
        'email_address': "",
        'gender': "",
        'birthdate': "",
        'contact_type': "",
        'patient_relationship': ""
      },
    };
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    reset: function () {
      Object.keys(this.newContact).forEach(key => {
        this.newContact[key] = null
      })
    },
    updateContact() {
      this.saving = true;
      let endpoint = `/api/v1/contact/${this.currentContact.id}/`;
      if (this.currentContact) {
        axios.put(endpoint, this.currentContact)
          .then((response) => {
            this.saving = false;
            this.currentContact = response.data;
            this.fetchContact();

            $("#editContactModal").modal("hide")
          })
          .catch((err) => {
            this.saving = false;
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
    addContact() {
      this.saving = true;
      this.adding = true;
      if (this.newContact) {
        axios.post(`/api/v1/contact/`, this.newContact)
          .then(() => {
            this.reset();
            this.saving = false;

            this.fetchContact();
          })
          .catch((err) => {
            this.saving = false;
            console.log(err.response);
          })
      }
    },
    fetchContact(id) {
      this.viewing = true;
      let endpoint = `/api/v1/contact/${id}/`;
      if (this.currentContact) {
        axios.get(endpoint)
          .then((response) => {
            this.currentContact = response.data;
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