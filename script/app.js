/*jshint esversion: 6 */

const App = {
    data() {
        return {
            mdFilePath: "",
            docTitle: "",
        };
    },
    methods: {
        getMdFile: function (event) {
            fetch("./explanation.md", {method: "GET",}).then(response => response.text()).then(text => {this.mdFilePath = text});
        }
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.mdFilePath);
        }
    },
    created() {
        var str = window.location.href.split('/').slice(-2).shift();
        this.docTitle = str + "-解説";
        document.title = this.docTitle;
        this.getMdFile();
        marked.setOptions({
            langPrefix: "hljs language-",
            highlight: function (code, lang) {
                return hljs.highlightAuto(code, [lang]).value
            }
        });
    }
};
Vue.createApp(App).mount('#app');