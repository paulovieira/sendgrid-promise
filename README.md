# sendgrid-promise

### Description

Simple promise wrapper around the [official](https://github.com/sendgrid/sendgrid-nodejs) sendgrid module (using Bluebird).

Some functionality has been added by monkey-patching the `toWebFormat` method, namely the `ccname` and `bccname` fields (which are [documented in the web api](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) but missing [in the official module](https://github.com/sendgrid/sendgrid-nodejs#available-params)).

This module will export an instance of the sendgrid object which can be reused everywhere in your application (since nodejs modules are [cached](https://nodejs.org/api/modules.html#modules_caching) after the first time they are loaded).

The API key is expected to be present in a text file located in `$PROJECT_ROOT/config/sendgrid-key.txt` (instead of the API key it can also be the user/password credentials, each in separate lines). See the example.

### Install

```sh
npm install --save sendgrid-promise
```

### Example

See `send-example.js`.

### Notes

If you just want to send simple plain-text emails it's a good idea to change some of the default settings in the sendgrid dashboard: 

1. go to `settings -> tracking`
2. make sure the following options are off: `click tracking` and `open tracking`

If not sendgrid will automatically create an html version of the email containing a hidden 1px image. In a gmail account (and likely in others) that tiny pixel will result in this undesirable message being displayed:

> "images are not displayed. Click to display images"

The user will click but nothing is shown...
