import Document, { Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.1.1/antd.min.css"
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
          <style>
            {`
							body {
								background: #F0F2F5;
							}
						`}
          </style>
        </body>
      </html>
    )
  }
}
