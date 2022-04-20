const pkg = require('./package.json')

const withPlugins = require('next-compose-plugins')
const graphql = require('next-plugin-graphql')
const withTranspileModule = require('next-transpile-modules')([])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = (phase, { defaultConfig }) => {
  const plugins = [graphql, withTranspileModule]

  return withPlugins(plugins, nextConfig)(phase, {
    defaultConfig,
  })
}

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
