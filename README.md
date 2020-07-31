# anchorfm-site-generator-lambda
An AWS Lambda to generate static archive site for your Anchor.fm Podcast.

You may find an example site here: https://twexpatsin.tech/

## Prerequisite
- AWS SDK and CLI
- [serverless](https://www.serverless.com/) framework
- A domain of your own
## Deployment
Make sure you have update the variables accordingly in `custom` section of `serverless.yml` before you proceed.
```shell
npm install
serverless deploy # Please note there are some manual steps to set up your domain. Follow the instructions given to finalise the deployment.
```
## Usage
By default the lambda is configured to be invoked manually. You can modify `serverless.yml` to run periodically.
