module.exports = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atom-profiles.s3.amazonaws.com",
        port: "",
        pathname: ""
      },
      {
        protocol: "https",
        hostname: "uploads-ssl.webflow.com",
        port: "",
        pathname: ""
      },
      {
        protocol: "https",
        hostname: "atomproduction.s3.amazonaws.com",
        port: "",
        pathname: "/public/**"
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: ""
      }
    ],
    domains: [
      "atomproduction.s3.amazonaws.com",
      "flagcdn.com",
      "https://atom-profiles.s3.amazonaws.com/",
      "https://uploads-ssl.webflow.com/",
      "https://atomproduction.s3.amazonaws.com/",
      "https://flagcdn.com"
    ],
    formats: ["image/avif", "image/webp"]
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  }
};
