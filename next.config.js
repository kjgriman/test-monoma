/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    urlPokemonApi: process.env.URL_BACKEND,
  },
}

module.exports = nextConfig
