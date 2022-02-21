# UI Library Release workflow

1. Create a new branch for the release. We need a good naming convention: `Release/<patch/minor/major>-<YYMMDD>` (example: `Release/Patch-220128`).
1. Review new release PR (either [on GitHub](https://github.com/umbraco/Umbraco.UI/compare/) or through `npm run lerna:diff`).
1. Make a PR from the new branch to the main branch.
1. Wait for GitHub checks to pass.
1. Run `npm run lerna:version`.
1. Select new version number for every package in the terminal.
1. Confirm the new versions.
1. Commit changes and `package-lock.json` to your release branch.
1. Wait for GitHub checks to pass.
1. Github will post a comment with a test link to try out that the release works in Storybook. Please check that it works.
1. Merge PR into main - this will trigger two actions - `Publish`, and `Azure Static Web Apps CI/CD`. The `Publish` workflow is responsible for publishing packages to NPM. It will only publish the packages that have higher version that previously published ones. The azure workflow will build and publish UI library Storybook.
1. Merge main branch into dev branch.

## How to clear tags (not relevant after latest update, but I will keep those guide if we reintroduce tags by our choice of change-log system)

If something goes wrong during the publish workflow, you might end up with tag numbers not corresponding to the current versions of the packages. Tags are stored both on remote and on local repository.

1. Go to Github and remove all tags with higher versions then the last published version.
2. Then delete all your local tags and replace them with the tags from the remote. To do that run the following inside your local repository.

OSX

```zsh
git tag -l | xargs git tag -d
git fetch --tags
```

WINDOWS

```powershell
git tag -l | %{git tag -d $_}
git fetch --tags
```
