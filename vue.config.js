// vue.config.js
module.exports = {
    chainWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.externals({
                jsencrypt: "jsencrypt"
            });

            config.plugin("copy").use(require("copy-webpack-plugin"), [
                [
                    {
                        from: "public",
                        to: "",
                        ignore: ["index.html", "favicon.ico"]
                    }
                ]
            ]);
        }

        config.resolve.alias.set("license", "@/license");
    },

    productionSourceMap: false
};
