"use strict";

/*jshint esversion: 6 */
var App = {
  data: function data() {
    return {
      mdFilePath: "",
      docTitle: ""
    };
  },
  methods: {
    getMdFile: function getMdFile(event) {
      var _this = this;

      fetch("./explanation.md", {
        method: "GET"
      }).then(function (response) {
        return response.text();
      }).then(function (text) {
        _this.mdFilePath = text;
      });
    }
  },
  computed: {
    compiledMarkdown: function compiledMarkdown() {
      return marked(this.mdFilePath);
    }
  },
  created: function created() {
    var str = window.location.href.split('/').slice(-2).shift();
    this.docTitle = str + "-解説";
    document.title = this.docTitle;
    this.getMdFile();
    marked.setOptions({
      langPrefix: "hljs language-",
      highlight: function highlight(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  }
};
Vue.createApp(App).mount('#app');