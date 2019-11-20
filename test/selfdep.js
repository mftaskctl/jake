let assert = require('assert');
let exec = require('child_process').execSync;

suite('selfDep', function () {

  let origStderrWrite;

  setup(function () {
    origStderrWrite = process.stderr.write;
    process.stderr.write = function () {};
    process.chdir('./test');
  });

  teardown(function () {
    process.stderr.write = origStderrWrite;
    process.chdir('../');
  });

  test('self dep const', function () {
    try {
      let out = exec('../bin/cli.js selfdepconst');
    }
    catch(e) {
      assert(e.message.indexOf('dependency of itself') > -1)
    }
  });

  test('self dep dyn', function () {
    try {
      let out = exec('../bin/cli.js selfdepdyn');
    }
    catch(e) {
      assert(e.message.indexOf('dependency of itself') > -1)
    }
  });

});


