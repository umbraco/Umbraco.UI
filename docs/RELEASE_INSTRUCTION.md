# UI Library Release workflow

1. Create a new branch for the release. We need a good naming convention: `Release/<patch/minor/major>-<YYMMDD>` (example: `Release/Patch-220128`).
1. Review new release PR (either [on GitHub](https://github.com/umbraco/Umbraco.UI/compare/) or through `npm run lerna:diff`).
1. Make a PR from the new branch to the main branch.
1. Wait for GitHub checks to pass.
1. Run `npm run lerna:version`.
1. Select new version number for every package in the terminal.
1. Confirm the new versions - **this step is irreversible**. It will create tags and commit those to the remote. [Check how to clear tags.](#How-to-clear-tags).
1. (TODO: Test the new setup works (by adding --no-push and no tag creation)... we haven't tried out jet, but it should fix the problem metnioned below by having a commit without the package-lock begin up to date.. If everything works then remove all tags from repo..).
1. Commit changes and `package-lock.json` to your release branch.
1. Wait for GitHub checks to pass. There will be one check that fails and this is the one triggered by a commit made by `npm run lerna:version` command. This fails because it runs build with old `package-lock.json` that does not have updated versions of the packages. After you commit the new package-lock the check should pass.
1. Merge PR into main - this will trigger two actions - `Publish`, and `Azure Static Web Apps CI/CD`. The `Publish` workflow is responsible for publishing packages to NPM. It will only publish the packages that have higher version that previously published ones. The azure workflow will build and publish UI library Storybook.
1. Merge main branch into dev branch.

## How to clear tags (maybe not relevant after update mentioned above...)

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
