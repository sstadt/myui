
import forgeUtil from '../../forge-util.js';
import validationRules from '../../_validationRules.js';

import template from './fInputTemplate.html';

var component = {
  template,
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    equalTo: {
      type: Object,
      default: null
    },
    pattern: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      error: '',
      inputValue: this.value
    };
  },
  computed: {
    regex() {
      return (this.pattern) ? new RegExp(this.pattern) : false;
    }
  },
  watch: {
    inputValue() {
      this.$emit('input', this.inputValue);
      this.debounceValidate();
    }
  },
  methods: {
    isValid() {
      this.validate();
      return (this.error.length === 0);
    },
    debounceValidate: forgeUtil.debounce(function () {
      this.validate();
    }, 500),
    validate() {
      var label = this.label || this.name;

      // required validation
      if (this.required && this.inputValue.length === 0) {
        this.error = label + ' is required';

      // custom regex validation
      } else if (this.regex && !this.regex.test(this.inputValue)) {
        this.error = validationRules.defaultError;

      // html5 data type validation
      } else if (validationRules.hasOwnProperty(this.type) && !validationRules[this.type].regex.test(this.inputValue)) {
        this.error = validationRules[this.type].defaultError;

      // equivalency validation
      } else if (this.equalTo && this.equalTo.value !== this.inputValue) {
        this.error = 'Must match ' + this.equalTo.label;

      // input is valid
      } else {
        this.error = '';
      }
    }
  }
};

export default component;
