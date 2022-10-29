//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const withLess = require("next-with-less");
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {

    svgr: false,
  },
};

module.exports = withNx(nextConfig);
module.exports = withLess({
  lessLoaderOptions: {},
});
