import { createClient } from 'microcms-js-sdk'; //ES6

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: "i-garasi-blog", // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  apiKey: "9879f828d6c54b4fae5c544817b4404a7090",
});