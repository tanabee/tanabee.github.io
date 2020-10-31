// ビルドディレクトリを docs に変更
// https://github.com/gatsbyjs/gatsby/issues/18975#issuecomment-607329178
const path = require('path');
const fs = require('fs-extra');

exports.onPostBuild = () => {
  fs.copySync(path.join(__dirname, 'public'), path.join(__dirname, 'docs'), {
    overwrite: true,
  });
};
