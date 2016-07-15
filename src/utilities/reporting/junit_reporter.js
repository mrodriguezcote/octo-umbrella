/* The following code is taken from the npm module:
https://www.npmjs.com/package/jasmine-reporters */

(function(global) {
    var UNDEFINED,
        exportObject;

    if (typeof module !== "undefined" && module.exports) {
        exportObject = exports;
    } else {
        exportObject = global.jasmineReporters = global.jasmineReporters || {};
    }

    function trim(str) { return str.replace(/^\s+/, "" ).replace(/\s+$/, "" ); }
    function elapsed(start, end) { return (end - start)/1000; }
    function isFailed(obj) { return obj.status === "failed"; }
    function isSkipped(obj) { return obj.status === "pending"; }
    function isDisabled(obj) { return obj.status === "disabled"; }
    function pad(n) { return n < 10 ? '0'+n : n; }
    function extend(dupe, obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                dupe[prop] = obj[prop];
            }
        }
        return dupe;
    }
    function ISODateString(d) {
        return d.getFullYear() + '-' +
            pad(d.getMonth()+1) + '-' +
            pad(d.getDate()) + 'T' +
            pad(d.getHours()) + ':' +
            pad(d.getMinutes()) + ':' +
            pad(d.getSeconds());
    }
    function escapeInvalidXmlChars(str) {
        return str.replace(/\&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/\>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/\'/g, "&apos;");
    }
    function getQualifiedFilename(path, filename, separator) {
        if (path && path.substr(-1) !== separator && filename.substr(0) !== separator) {
            path += separator;
        }
        return path + filename;
    }
    function log(str) {
        var con = global.console || console;
        if (con && con.log) {
            con.log(str);
        }
    }

    exportObject.JUnitXmlReporter = function(options) {
        var self = this;
        self.started = false;
        self.finished = false;
        options = options || {};
        self.savePath = options.savePath || '';
        self.consolidate = options.consolidate === UNDEFINED ? true : options.consolidate;
        self.consolidateAll = self.consolidate !== false && (options.consolidateAll === UNDEFINED ? true : options.consolidateAll);
        self.useDotNotation = options.useDotNotation === UNDEFINED ? true : options.useDotNotation;
        if (self.consolidateAll) {
            self.filePrefix = options.filePrefix || 'junitresults';
        } else {
            self.filePrefix = typeof options.filePrefix === 'string' ? options.filePrefix : 'junitresults-';
        }
        self.package = typeof(options.package) === 'string' ? escapeInvalidXmlChars(options.package) : UNDEFINED;

        if(options.modifySuiteName && typeof options.modifySuiteName !== 'function') {
            throw new Error('option "modifySuiteName" must be a function');
        }
        if(options.systemOut && typeof options.systemOut !== 'function') {
            throw new Error('option "systemOut" must be a function');
        }

        var delegates = {};
        delegates.modifySuiteName = options.modifySuiteName;
        delegates.systemOut = options.systemOut;

        var suites = [],
            currentSuite = null,
            totalSpecsExecuted = 0,
            totalSpecsDefined,
            fakeFocusedSuite = {
                id: 'focused',
                description: 'focused specs',
                fullName: 'focused specs'
            };

        var __suites = {}, __specs = {};
        function getSuite(suite) {
            __suites[suite.id] = extend(__suites[suite.id] || {}, suite);
            return __suites[suite.id];
        }
        function getSpec(spec) {
            __specs[spec.id] = extend(__specs[spec.id] || {}, spec);
            return __specs[spec.id];
        }

        self.jasmineStarted = function(summary) {
            totalSpecsDefined = summary && summary.totalSpecsDefined || NaN;
            exportObject.startTime = new Date();
            self.started = true;
        };
        self.suiteStarted = function(suite) {
            suite = getSuite(suite);
            suite._startTime = new Date();
            suite._specs = [];
            suite._suites = [];
            suite._failures = 0;
            suite._skipped = 0;
            suite._disabled = 0;
            suite._parent = currentSuite;
            if (!currentSuite) {
                suites.push(suite);
            } else {
                currentSuite._suites.push(suite);
            }
            currentSuite = suite;
        };
        self.specStarted = function(spec) {
            if (!currentSuite) {
                self.suiteStarted(fakeFocusedSuite);
            }
            spec = getSpec(spec);
            spec._startTime = new Date();
            spec._suite = currentSuite;
            currentSuite._specs.push(spec);
        };
        self.specDone = function(spec) {
            spec = getSpec(spec);
            spec._endTime = new Date();
            if (isSkipped(spec)) { spec._suite._skipped++; }
            if (isDisabled(spec)) { spec._suite._disabled++; }
            if (isFailed(spec)) { spec._suite._failures += spec.failedExpectations.length; }
            totalSpecsExecuted++;
        };
        self.suiteDone = function(suite) {
            suite = getSuite(suite);
            if (suite._parent === UNDEFINED) {
                self.suiteStarted(suite);
            }
            suite._endTime = new Date();
            currentSuite = suite._parent;
        };
        self.jasmineDone = function() {
            if (currentSuite) {        
                self.suiteDone(fakeFocusedSuite);
            }
            var output = '';
            for (var i = 0; i < suites.length; i++) {
                output += self.getOrWriteNestedOutput(suites[i]);
            }
            if (output) {
                wrapOutputAndWriteFile(self.filePrefix, output);
            }

            self.finished = true;
            exportObject.endTime = new Date();
        };

        self.getOrWriteNestedOutput = function(suite) {
            var output = suiteAsXml(suite);
            for (var i = 0; i < suite._suites.length; i++) {
                output += self.getOrWriteNestedOutput(suite._suites[i]);
            }
            if (self.consolidateAll || self.consolidate && suite._parent) {
                return output;
            } else {
                wrapOutputAndWriteFile(generateFilename(suite), output);
                return '';
            }
        };

        self.writeFile = function(filename, text) {
            var errors = [];
            var path = self.savePath;

            function phantomWrite(path, filename, text) {
                filename = getQualifiedFilename(path, filename, window.fs_path_separator);
                __phantom_writeFile(filename, text);
            }

            function nodeWrite(path, filename, text) {
                var fs = require("fs");
                var nodejs_path = require("path");
                require("mkdirp").sync(path);
                var filepath = nodejs_path.join(path, filename);
                var xmlfile = fs.openSync(filepath, "w");
                fs.writeSync(xmlfile, text, 0);
                fs.closeSync(xmlfile);
                return;
            }
            try {
                phantomWrite(path, filename, text);
                return;
            } catch (e) { errors.push('  PhantomJs attempt: ' + e.message); }
            try {
                nodeWrite(path, filename, text);
                return;
            } catch (f) { errors.push('  NodeJS attempt: ' + f.message); }

            log("Warning: writing junit report failed for '" + path + "', '" +
                filename + "'. Reasons:\n" +
                errors.join("\n")
            );
        };

        function generateFilename(suite) {
            return self.filePrefix + getFullyQualifiedSuiteName(suite, true) + '.xml';
        }

        function getFullyQualifiedSuiteName(suite, isFilename) {
            var fullName;
            if (self.useDotNotation || isFilename) {
                fullName = suite.description;
                for (var parent = suite._parent; parent; parent = parent._parent) {
                    fullName = parent.description + '.' + fullName;
                }
            } else {
                fullName = suite.fullName;
            }

            if (isFilename) {
                var fileName = "",
                    rFileChars = /[\w\.]/,
                    chr;
                while (fullName.length) {
                    chr = fullName[0];
                    fullName = fullName.substr(1);
                    if (rFileChars.test(chr)) {
                        fileName += chr;
                    }
                }
                return fileName;
            } else {

                if(delegates.modifySuiteName) {
                    fullName = options.modifySuiteName(fullName, suite);
                }

                return escapeInvalidXmlChars(fullName);
            }
        }

        function suiteAsXml(suite) {
            var xml = '\n <testsuite name="' + getFullyQualifiedSuiteName(suite) + '"';
            xml += ' timestamp="' + ISODateString(suite._startTime) + '"';
            xml += ' hostname="localhost"';
            xml += ' time="' + elapsed(suite._startTime, suite._endTime) + '"';
            xml += ' errors="0"';
            xml += ' tests="' + suite._specs.length + '"';
            xml += ' skipped="' + suite._skipped + '"';
            xml += ' disabled="' + suite._disabled + '"';
            xml += ' failures="' + suite._failures + '"';
            if (self.package) {
                xml += ' package="' + self.package + '"';
            }
            xml += '>';

            for (var i = 0; i < suite._specs.length; i++) {
                xml += specAsXml(suite._specs[i]);
            }
            xml += '\n </testsuite>';
            return xml;
        }
        function specAsXml(spec) {
            var xml = '\n  <testcase classname="' + getFullyQualifiedSuiteName(spec._suite) + '"';
            xml += ' name="' + escapeInvalidXmlChars(spec.description) + '"';
            xml += ' time="' + elapsed(spec._startTime, spec._endTime) + '"';

            var testCaseBody = '';
            if (isSkipped(spec) || isDisabled(spec)) {
                if (spec.pendingReason) {
                    testCaseBody = '\n   <skipped message="' + trim(escapeInvalidXmlChars(spec.pendingReason)) + '" />';
                } else {
                    testCaseBody = '\n   <skipped />';
                }
            } else if (isFailed(spec)) {
                for (var i = 0, failure; i < spec.failedExpectations.length; i++) {
                    failure = spec.failedExpectations[i];
                    testCaseBody += '\n   <failure type="' + (failure.matcherName || "exception") + '"';
                    testCaseBody += ' message="' + trim(escapeInvalidXmlChars(failure.message))+ '"';
                    testCaseBody += '>';
                    testCaseBody += '<![CDATA[' + trim(failure.stack || failure.message) + ']]>';
                    testCaseBody += '\n   </failure>';
                }
            }

            if (testCaseBody || delegates.systemOut) {
                xml += '>' + testCaseBody;
                if (delegates.systemOut) {
                    xml += '\n   <system-out>' + trim(escapeInvalidXmlChars(delegates.systemOut(spec, getFullyQualifiedSuiteName(spec._suite, true)))) + '</system-out>';
                }
                xml += '\n  </testcase>';
            } else {
                xml += ' />';
            }
            return xml;
        }

        var prefix = '<?xml version="1.0" encoding="UTF-8" ?>';
        prefix += '\n<?xml-stylesheet type="text/xsl" href="'+options.stylesheet+'"?>';
        prefix += '\n<testsuites>';
        var suffix = '\n</testsuites>';
        function wrapOutputAndWriteFile(filename, text) {
            if (filename.substr(-4) !== '.xml') { filename += '.xml'; }
            self.writeFile(filename, (prefix + text + suffix));
        }
    };
})(this);
