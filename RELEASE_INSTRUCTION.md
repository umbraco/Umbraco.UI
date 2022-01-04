# UI Library Release workflow

1. Create a new branch for the release. We need a good naming convention: `Release/<patch/minor/major>-<DDMMYY>` (example: `Release/Patch-040122`)
1. Review new release PR (either [on GitHub](https://github.com/umbraco/Umbraco.UI/compare/) or through `npm run lerna:diff`)
1. Make a PR from the new branch to the main branch
1. Wait for GitHub checks to pass.
1. Run `npm run lerna:version`
1. Select new version number for every package in the terminal
1. Confirm the new versions - **this step is irreversible**. It will create tags and commit those to the remote. [Check how to clear tags.](#How-to-clear-tags:)
1. Commit `package-lock.json` to your release branch
1. Wait for GitHub checks to pass. There will be one check that fails and this is the one triggered by a commit made by `npm run lerna:version` command. This fails because it runs build with old `package-lock.json` that does not have updated versions of the packages. After you commit the new package-lock the check should pass.
1. Merge PR into main - this will trigger two actions - `Publish`, and `Azure Static Web Apps CI/CD`. The `Publish` workflow is responsible for publishing packages to NPM. It will only publish the packages that have higher version that previously published ones. The azure workflow will build and publish UI library Storybook
   Merge main branch into dev branch

## How to clear tags:

If something goes wrong during the publish workflow, you might end up with tag numbers not corresponding to the current versions of the packages. Tags are stored both on remote and on local repository. Go to Github and remove

Delete all your local tags and replace them with the tags from remote. Run the following inside your local repository.

OSX
git tag -l | xargs git tag -d
git fetch --tags

WINDOWS
git tag -l | %{git tag -d $\_}
git fetch --tags
