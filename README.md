# sendgrid-promise

### Description

Simple promise wrapper around the official sendgrid module. 

Some functionality has been added by monkey-patching the `toWebFormat` method, namely the `ccname` and `bccname` fields (which are [documented in the web api](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) but missing [in the official module](https://github.com/sendgrid/sendgrid-nodejs#available-params)).

### Install

```sh
npm install --save sendgrid-promise
```

### Example

See the `send-example.js`

### Notes

If you just want to send simple plain-text emails it's a good idea to change some of the default settings in sendgrid dashboard: 

1) go to `settings -> tracking`, 
2) make sure the following options are off: `click tracking` and `open tracking`;

If not sendgrid will automatically create an html version of the email containing a hidden 1px image. In a gmail account (and likely in others) this will result in this undesirable message: 

>
> "images are not displayed. Click to display images"
>

The user will click but nothing is shown...

