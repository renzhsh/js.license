// vue.config.js
module.exports = {
    chainWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.externals({
                vue: "Vue"
            });
        }

        config.resolve.alias.set("license", "@/license");
    }
};
