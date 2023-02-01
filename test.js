const defaultBabelOptions = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
}


// console.log( defaultBabelOptions.presets.concat(['@babel/preset-typescript']))
console.log( {...defaultBabelOptions, presets : [...defaultBabelOptions.presets, '@babel/preset-typescript']})

const loaders = [{
    loader: 'babel-loader'
}]

loaders.push('eslint-loader')

console.log(loaders)