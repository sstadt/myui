
Vue.config.debug = true;

new Vue({
  el: '#alert_demo',
  data: {
    alertMessage: '',
    selectedMessageType: 'message',
    messageTypes: [
      { value: 'message', label: 'vm.$refs.myAlert.message()' },
      { value: 'primary', label: 'vm.$refs.myAlert.primary()' },
      { value: 'secondary', label: 'vm.$refs.myAlert.secondary()' },
      { value: 'success', label: 'vm.$refs.myAlert.success()' },
      { value: 'warning', label: 'vm.$refs.myAlert.warning()' },
      { value: 'alert', label: 'vm.$refs.myAlert.alert()' },
    ]
  },
  methods: {
    newMessage() {
      this.$refs.myAlert[this.selectedMessageType](this.alertMessage);
    }
  }
});

new Vue({
  el: '#modal_demo',
  data: {
    showModal: false
  }
});

new Vue({
  el: '#prompt_demo',
  methods: {
    prompt(method) {
      this.$refs.myPrompt[method]({
        question: 'Judge me by my size, do you?',
        yes: function (answer) {
          // if method is 'ask',
          // the dialog input value will be passed as the first argument
        },
        no: function () {
          // the prompt will close itself,
          // but you can use this option to trigger side effects
        }
      });
    }
  }
});

new Vue({
  el: '#tabs_demo'
});

new Vue({
  el: '#input_demo',
  data: {
    email: ''
  }
});
