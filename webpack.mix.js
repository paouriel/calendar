const mix = require('laravel-mix')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

require('laravel-mix-bundle-analyzer')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

if (!mix.inProduction()) {
    mix.bundleAnalyzer()
}

Mix.listen('configReady', config => {
    const scssRule = config.module.rules.find(r => r.test.toString() === /\.scss$/.toString())
    const scssOptions = scssRule.loaders.find(l => l.loader === 'sass-loader').options
    scssOptions.prependData = '@import "./resources/sass/styles.scss";'

    const sassRule = config.module.rules.find(r => r.test.toString() === /\.sass$/.toString())
    const sassOptions = sassRule.loaders.find(l => l.loader === 'sass-loader').options
    sassOptions.prependData = '@import "./resources/sass/styles.scss"'
})

mix
    .webpackConfig({
        plugins: [new VuetifyLoaderPlugin()]
    })
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
