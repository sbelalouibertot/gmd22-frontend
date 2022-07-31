const withPlugins = require('next-compose-plugins')
const graphql = require('next-plugin-graphql')
const withTranspileModule = require('next-transpile-modules')([])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    PRODUCTION_HOST_IP: process.env.PRODUCTION_HOST_IP,
    PRODUCTION_API_PORT: process.env.PRODUCTION_API_PORT,
   },
  webpackDevMiddleware: config => {
    return config
  },
  images: {
    domains: ['assets.afcdn.com', 'i.ibb.co'],
  },
}

module.exports = (phase, { defaultConfig }) => {
  const plugins = [graphql, withTranspileModule]

  return withPlugins(plugins, nextConfig)(phase, {
    defaultConfig,
  })
}

