const lcov2badge = require('lcov2badge');
const fs = require('fs');

lcov2badge.badge('./coverage/lcov.info', (err, svgBadge) => {
  if (err) {
    throw err;
  }

  fs.writeFile('coverage.svg', svgBadge, console.error);
});
