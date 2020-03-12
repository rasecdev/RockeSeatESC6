module.exports = {
    //arquivo principal
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        //__dirname -> se refere ao diretório atual do arquivo
        path: __dirname + '/public/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public/'
    },
    module: {
        //Toda vez que a aplicação importar um novo arquivo .js vai ser chamado o @babel
        rules: [
            {
                test: /\.js$/,
                //não executar os .js do node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
};