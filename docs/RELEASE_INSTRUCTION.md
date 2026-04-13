# UI Library Release workflow

1. Create a new branch for the release. We need a good naming convention: `release/<Version>` (example: `release/1.12.0`).
1. Review new release PR (either [on GitHub](https://github.com/umbraco/Umbraco.UI/compare/)).
1. Run `npm run lerna:version` and Lerna will suggest a version bump for the `@umbraco-ui/uui` package.
1. Review the new version number and accept with `y` and Lerna will now bump the package version and update the local CHANGELOG.md file using descriptions from the conventional commits, Lerna will also reinstall NPM and generate a new lockfile.
1. Push all the changes to your release branch.
1. Make a PR from the new branch to the `production` branch.
1. Add the `ignore-for-release`-label to the PR.
1. Wait for GitHub checks to pass.
1. Github will post a comment with a test link to try out that the release works in Storybook. Please check that it works.
1. Merge PR into production **using the Merge strategy** (very important so the history is not mangled) - this will trigger two actions - `Publish`, and `Azure Static Web Apps CI/CD`. The `Publish` workflow is responsible for publishing the package to NPM. The azure workflow will build and publish UI library Storybook.
1. Merge the `production` back into the `main` branch by writing `git merge origin/production` when on the `main` branch, and then push the changes. (This way we ensure that the `main` branch is always up to date with the latest release and accompanying release notes).
1. Go to Github and [create a new release](https://github.com/umbraco/Umbraco.UI/releases/new).
   1. Using tags on the release, we want to target `vx.x.x` where "x.x.x" is the version number that the UUI package was bumped to during the release.
   1. Select the prevous version, in relation to your release, in `Previous tag` and press `Generate release notes`.
   1. Check the generated release notes, see if PRs are in the right category, if not append labels to them and return to generate again.
1. The UI Library has now been updated.
1. Write an post on the UI Library Slack Channel.
1. Consider when to update the Backoffice.

## How to clear tags

If something goes wrong during the publish workflow, you might end up with tag numbers not corresponding to the current version of the package. Tags are stored both on remote and on local repository.

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
