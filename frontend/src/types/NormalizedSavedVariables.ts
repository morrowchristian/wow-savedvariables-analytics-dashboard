export interface NormalizedSavedVariables {
  metadata: {
    parsedAt: string
    sourceAddon: string
  }
  characters: Array<{
    name: string
    realm: string
    class: string
    level: number
  }>
}
