import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'w5hrk5sv',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    // Studio publik di https://surau-bateh.sanity.studio -- terpisah dari
    // deploy `site/` (lihat ADR 0006, .scratch/cms-migration-sanity/spec.md).
    studioHost: 'surau-bateh',
    appId: 'c6grfzh6viiuy6kg8kq0rgmj',
  },
})
