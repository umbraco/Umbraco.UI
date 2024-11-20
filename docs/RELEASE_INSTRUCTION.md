# UI Library Release workflow

1. Create a new branch for the release. We need a good naming convention: `release/<Version>` (example: `release/1.12.0`).
1. Review new release PR (either [on GitHub](https://github.com/umbraco/Umbraco.UI/compare/)).
1. Make a PR from the new branch to the `main` branch.
1. Run `npm run lerna:version` and Lerna will suggest a version bump for each package.
1. Review the new version numbers and accept with `y` and Lerna will now bump each package and update the local CHANGELOG.md file using descriptions from the conventional commits, Lerna will also reinstall NPM and generate a new lockfile.
   1. We are continuously improving the way Lerna detects changes, so you may run into packages being bumped and you do not know why. It is okay to publish a package that has not been changed in order not to mess too much with the logic that Lerna uses to detect changes.
1. Push all the changes to your release branch.
1. Wait for GitHub checks to pass.
1. Github will post a comment with a test link to try out that the release works in Storybook. Please check that it works.
1. Merge PR into main **using the rebase strategy** (very important so the history is not mangled) - this will trigger two actions - `Publish`, and `Azure Static Web Apps CI/CD`. The `Publish` workflow is responsible for publishing packages to NPM. It will only publish the packages that have higher version that previously published ones. The azure workflow will build and publish UI library Storybook.
1. Rebase the `main` branch with the `dev` branch by writing `git rebase -i origin/main` and then push the changes.
1. Go to Github and [create a new release](https://github.com/umbraco/Umbraco.UI/releases/new).
   1. Using tags on the release, we want to target `@umbraco-ui/uui@x.x.x` where "x.x.x" is the version number that the UUI package was bumped to during the release.
   1. Copy/paste the release notes generated from before into the release notes field and do a sanity check of the texts - feel free to move stuff around or add additional info.
1. The UI Library has now been updated.

## How to clear tags

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
