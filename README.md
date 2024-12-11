# Source of gariany.com

Elad's cyber real estate, projects portfolio and memories.

## Local git lfs Setup:

* current lfs server is [deployed here](https://ac1oitsl90.execute-api.us-west-1.amazonaws.com/) using [this solution](https://github.com/troyready/git-lfs-s3).
* git pull/push to load media files into local development

## Deployment

Straight up oldskool

```
aws s3 sync public/ s3://gariany.com/
```