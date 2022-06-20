import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

type EnvVars = {
  PRODUCTION_HOST_IP: string
  PRODUCTION_API_PORT: string
}

export const env: EnvVars = publicRuntimeConfig
